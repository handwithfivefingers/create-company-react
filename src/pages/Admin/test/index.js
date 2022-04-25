import React, { useEffect, useRef, useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Drawer, Button } from "antd";

let PizZipUtils = null;

if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const generateDocument = (json) => {
  loadFile("/files/dieulecanhan.docx", function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater().loadZip(zip);
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      ...json,
    });
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // Output the document using Data-URI
    saveAs(out, "output.docx");
  });
};

export default function PDFViewerComponent(props) {
  const refViewer = useRef();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!refViewer?.current.hasChildNodes()) {
      import("@pdftron/webviewer").then(() => {
        WebViewer(
          {
            path: "/lib",
            initialDoc: "/files/dieulecanhan.docx",
            // css: '/files/iframe.css'
          },
          refViewer.current
        ).then((instance) => {
          const { documentViewer } = instance.Core;
          documentViewer.on("documentLoaded", async () => {
            const doc = documentViewer.getDocument();
            // it is possible to extract document template keys in WebViewer
            documentViewer.updateView();
            const keys = doc.getTemplateKeys();
            await documentViewer.getDocument().applyTemplateValues(json);
          });
        });
      });
    }
    return;
  }, [refViewer]);

  const json = {
    company_name: "TNHH 4 thành viên",
    name: "Truyền mai văn",
    birth_day: "24-12-1995",
  };

  return (
    <>
      <Button onClick={() => generateDocument(json)}>Dowload file</Button>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>
      <div ref={refViewer} style={{ height: "100vh" }}></div>
      <Drawer
        title="Edit Information"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
