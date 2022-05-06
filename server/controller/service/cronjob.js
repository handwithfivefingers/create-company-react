const { removeFile } = require("../../response");
const { Order } = require("../../model");

const docxConverter = require("docx-pdf");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const cron = require("node-cron");

exports.task = cron.schedule(
  "* * * * *",
  async () => {
    let _order = await Order.find({ payment: "1" });
    console.log("running Task", _order);
  },
  {
    scheduled: false,
  },
);




const convertFile = async (req, res) => {
  let buffer = await applyContent();
  //   // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  let docxFile = await saveFileAsDocx(buffer);

  //   console.log(docxFile); // filePath;

  let pdfLocation = path.join(global.__dirname, "/uploads", `${shortid.generate()}-output.pdf`);

  docxConverter(docxFile, pdfLocation, async (err, result) => {
    await removeFile(docxFile);
    if (err) res.status(200).json({ message: "err", err });
    else res.status(200).json({ message: "ok" });
  });
};

const applyContent = async (data = null) => {
  const content = await fs.readFileSync(
    path.resolve(path.join(global.__dirname, "/public/files/dieulecanhan.docx")),
    "binary",
  );

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // doc.render(json);
  doc.render();

  return doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
};

const saveFileAsDocx = async (buffer) => {
  let filePath = path.join(global.__dirname, "/uploads", `${shortid.generate()}-output.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
