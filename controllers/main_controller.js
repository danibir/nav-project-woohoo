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
    return res.render("findData", { data: [], sort });
  }

  let data = await helper.searchQuery(Rdf, query);

  // Sorting logic
  if (sort === "Sist publisert") {
    data.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  } else if (sort === "A - Å") {
    data.sort((a, b) =>
      (a.title?.object?.nb?.[0] || "").localeCompare(
        b.title?.object?.nb?.[0] || "",
      ),
    );
  } else if (sort === "Å - A") {
    data.sort((a, b) =>
      (b.title?.object?.nb?.[0] || "").localeCompare(
        a.title?.object?.nb?.[0] || "",
      ),
    );
  }
  // For "Relevanse", no sorting applied - it relies on MongoDB's default order (insertion order or relevance based on the query).
  // page logic
  const page = 0 // use this to pick page // assign it with a parameter or something
  const pagesize = 5
  const pagecount = Math.ceil(data.length / pagesize) //max amount of pages
  data = data.slice(0 + page * pagesize, pagesize + page * pagesize)
  res.render("findData", { data, sort, pagecount });
};

const rdf_render = async (req, res) => {
  res.locals.metatitle = "rdf...";
  const rdfinfo = await rdf.getRDF(
    "https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab",
  );
  res.render("tempRDF", { rdf: rdfinfo });
};

const overview_render = async (req, res) => {
  let subject = req.params.name
  console.log(subject)
  const data = await Rdf.findOne({ "title.object.nb": { $regex: subject, $options: "i" } })
  try {
    if (!data) {
      console.log("not found");
      return helper.renderErrorPage(res, 404, "Finner ikke siden")
    } else {
      console.log("found");
      const rdfdata = await rdf.getRDF(data.url)
      const cleandata = helper.trimRdfdata(rdfdata)
      res.locals.metatitle = subject;
      res.render("overview", { title: subject, rdfdata: cleandata, entry: data })
    }
  } catch(err) {
    console.log(`datapage error: ${err}`)
    return helper.renderErrorPage(res, 500, "Intern server feil")
  }
}

const details_render = async (req, res) => {
  let subject = req.params.name
  console.log(subject)
  const data = await Rdf.findOne({ "title.object.nb": { $regex: subject, $options: "i" } })
  try {
    if (!data) {
      console.log("not found")
      console.log(data)
      return helper.renderErrorPage(res, 404, "Finner ikke siden")
    } else {
      console.log("found")
      const rdfdata = await rdf.getRDF(data.url)
      const cleandata = helper.trimRdfdata(rdfdata)
      res.locals.metatitle = subject
      res.render("details", { title: subject, rdfdata: cleandata, entry: data })
    }
  } catch(err) {
    console.log(`datapage error: ${err}`)
    return helper.renderErrorPage(res, 500, "Intern server feil")
  }
}

module.exports = {
  index_render,
  findData_render,
  rdf_render,
  overview_render,
  details_render,
};
