import { handleMailer } from "../sendmail";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import getConfig from "next/config";
import shortid from "shortid";
import docxConverter from "docx-pdf";

import { removeFile } from "@/api/authenticate";

const { serverRuntimeConfig } = getConfig();

// Load the docx file as binary content

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      //   return await testCronJobMailer(req, res);
      return await handlerCronJob(req, res);
  }
}

// const testCronJobMailer = async (req, res) => {
//   console.log("coming here ?");
//   let user = {
//     email: "handgod1995@gmail.com",
//     subject: "Test Await",
//     content: "hihi",
//     password: "test cronjob",
//   };
//   await handleMailer(user);
//   return res.status(200).json({ message: "ok" });
// };
let json = {
  base_val_char: "Sáu trăm triệu",
  base_val_num: 600000000,
  company_core_address: "57/7a DBP",
  company_core_address_opt_1: "",
  company_core_address_opt_2: "",
  company_core_name: "Bàn Tay Group",
  company_core_name_en: "Five Finger",
  company_core_name_vn: "FF",
  company_main_career: "61e6ed293c1c10660de94bf0",
  company_opt_career: [
    {
      code: undefined,
      index: "1",
      name: undefined,
    },
  ],
  company_value: 600000000,
  legal_respon: [
    {
      code: undefined,
      index: "1",
      name: "Mai Văn Truyền",
    },
  ],
  origin_person_doc_code: "12345667",
  origin_person_doc_place_provide: "Quảng ngãi",
  origin_person_doc_time_provide: "2022-01-14T09:30:14.283Z",
  origin_person_doc_type: 4,
  origin_person_name: "Mai Văn Truyền",
  per_main_birth_day: "1995-12-24T03:46:30.325Z",
  per_main_current_address: "Hồ Chí Minh",
  per_main_gender: 1,
  per_main_name: "Mai Văn Truyền",
  per_main_per_type: "Kinh",
  per_main_reg_address: "Daklak",
  present_person: 2,
  productId: "61d454d94d6455805f39ec24",
  selectProduct: "61d454d94d6455805f39ec24",
};

const handlerCronJob = async (req, res) => {
  //   libre.convertAsync = util.promisify(libre.convert);

  let buffer = await applyContent();
  //   // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  let docxFile = await saveFileAsDocx(buffer);

  //   console.log(docxFile); // filePath;

  let pdfLocation = path.join(serverRuntimeConfig.PROJECT_ROOT, "/uploads", `${shortid.generate()}-output.pdf`);

  docxConverter(docxFile, pdfLocation, async (err, result) => {
    await removeFile(docxFile);
    if (err) res.status(200).json({ message: "err", err });
    else res.status(200).json({ message: "ok" });
  });
};

const applyContent = async (data = null) => {
  const content = await fs.readFileSync(
    path.resolve(path.join(serverRuntimeConfig.PROJECT_ROOT, "/public/files/dieulecanhan.docx")),
    "binary"
  );

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(json);

  return doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
};

const saveFileAsDocx = async (buffer) => {
  let filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, "/uploads", `${shortid.generate()}-output.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
