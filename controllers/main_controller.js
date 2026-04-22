//RDF functions
const rdf = require("../rdf/rdf.js");
const rdfobj = require("../rdf/getRDFobject.js");

//Models
const Rdf = require("../models/main_model.js");

//Handlers
const db = require("../handlers/mongoDbHandler.js");
const helper = require('../handlers/helperware.js')


//controllers
const index_render = async (req, res) => {
  if (!req.isDBConnected) {
    return res.render('index')
  }
  try {
    res.render("index", {})
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const findData_render = async (req, res) => {
  
  if (!req.isDBConnected) {
    return res.render('findData', { rdf: [], rdfList: []})
  }
  const query = req.query.search || "";
  let data = [];

  if (query != "" || query.trim()) {
    const searchPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") //security meassure apparently (removes injection-like keys)
    data = await Rdf.find({
      $or: [
        { "title.object.nb": { $regex: searchPattern, $options: "i" } },
        { "title.object.en": { $regex: searchPattern, $options: "i" } },
      ],
    })
  } else {
    data = await Rdf.find({})
  }
  const rdfList = await Promise.all(data.map((item) => rdf.getRDF(item.url)));
  res.render("findData", { rdf, rdfList });
};

const rdf_render = async (req, res) => {
  const rdfinfo = await rdf.getRDF(
    "https://fellesdatakatalog.digdir.no/datasets/3b6cb3a2-8211-3564-a576-4047c6f614ab",
  );
  res.render("tempRDF", { rdf: rdfinfo });
};

const info_render = async (req, res) => {
  let subject = req.params.name;
  console.log(subject)
  Rdf.find({ "title.object.nb": { $regex: subject, $options: "i" } })
    .then(async (resu) => {
      if (resu.length == 0) {
        console.log('not found')
        console.log(resu);
        return helper.renderErrorPage(res, 404, 'Page not')
      } else {
        console.log('found')
        console.log(resu[0]);
        const rdfdata = await rdf.getRDF(resu[0].url);
        console.log(rdfdata);
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
