//RDF functions
const rdf = require("../rdf/rdf.js");
const rdfobj = require("../rdf/getRDFobject.js");

//Models
const Rdf = require("../models/main_model.js");

//Handlers
const db = require("../handlers/mongoDbHandler.js");
const helper = require("../handlers/helperware.js");

//controllers
const index_render = async (req, res) => {
  res.locals.metatitle = "Hjemmeside";
  if (!req.isDBConnected) {
    return res.render("index");
  }
  try {
    res.render("index", {});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const findData_render = async (req, res) => {
  res.locals.metatitle = "Finn data";
  const query = req.query.search || "";
  const sort = req.query.sort || "";
  if (!req.isDBConnected) {
    return res.render("findData", { rdf: [], rdfList: [], sort });
  }
  let data = [];

  if (query.trim() !== "") {
    const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //security measure: escape regex-special chars
    data = await Rdf.find({
      $or: [
        { "title.object.nb": { $regex: searchPattern, $options: "i" } },
        { "title.object.en": { $regex: searchPattern, $options: "i" } },
      ],
    });
  } else {
    data = await Rdf.find({});
  }
  for (dataItem of data) {
    dataItem.rdf = await rdf.getRDF(dataItem.url);
  }

  // Sorting logic
  if (sort === "Sist publisert") {
    data.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  } else if (sort === "A - Å") {
    data.sort((a, b) =>
      (a.rdf.title?.object?.nb?.[0] || "").localeCompare(
        b.rdf.title?.object?.nb?.[0] || "",
      ),
    );
  } else if (sort === "Å - A") {
    data.sort((a, b) =>
      (b.rdf.title?.object?.nb?.[0] || "").localeCompare(
        a.rdf.title?.object?.nb?.[0] || "",
      ),
    );
  }
  // For "Relevanse", no sorting applied - it relies on MongoDB's default order (insertion order or relevance based on the query).

  res.render("findData", { data, sort });
};

const rdf_render = async (req, res) => {
  res.locals.metatitle = "rdf...";
  const rdfinfo = await rdf.getRDF(
    "https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab",
  );
  res.render("tempRDF", { rdf: rdfinfo });
};

const info_render = async (req, res) => {
  let subject = req.params.name;
  console.log(subject);
  Rdf.find({ "title.object.nb": { $regex: subject, $options: "i" } })
    .then(async (resu) => {
      if (resu.length == 0) {
        console.log("not found");
        console.log(resu);
        return helper.renderErrorPage(res, 404, "Page not");
      } else {
        console.log("found");
        console.log(resu[0]);
        const rdfdata = await rdf.getRDF(resu[0].url);
        console.log(rdfdata);
        res.locals.metatitle = subject;
        res.render("info", { title: subject, rdfdata });
      }
    })
    .catch((err) => {
      console.log(`datapage error: ${err}`);
      res.redirect("/rdf");
    });
};

module.exports = {
  index_render,
  findData_render,
  rdf_render,
  info_render,
};
