import { Skeleton, Col } from "antd";
import ProductCard from "../components/Products";
import { BaseFieldText } from "./../contants/Common";
import moment from "moment";

export function number_format(number) {
  // console.log(number)
  return new Intl.NumberFormat().format(number);
}

export const renderSkeleton = (number) => {
  let xhtml = [];
  for (let i = 0; i < number; i++) {
    xhtml.push(
      <Col key={i} lg={6} md={12} sm={24} xs={24}>
        <ProductCard type="loading" />
      </Col>
    );
  }
  return xhtml;
};

export const renderField = (item, path, condition = null, index = null) => {
  let xhtml = null;

  if (condition === "gender") {
    if (path[item] === 1) {
      xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: Female</p>;
    } else {
      xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: Male</p>;
    }
  }

  if (condition === "doc_type") {
    if (path[item] == 1) xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: CMND</p>;
    if (path[item] == 2) xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: CCCD</p>;
    if (path[item] == 3) xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: Hộ chiếu</p>;
    if (path[item] == 4) xhtml = <p key={[path, index ? index : "", item]}>{BaseFieldText[item]}: Mã doanh nghiệp</p>;
  }

  if (condition === "doc_time_provide") {
    xhtml = (
      <p key={[path, index ? index : "", item]}>
        {BaseFieldText[item]}:{moment(path[item]).format("YYYY-MM-DD")}
      </p>
    );
  }

  if (condition === "birth_day") {
    return (
      <p key={[path, index ? index : "", item]}>
        {BaseFieldText[item]}: {moment(path[item]).format("YYYY-MM-DD")}
      </p>
    );
  }

  if (!condition) {
    xhtml = (
      <p key={[path, index ? index : "", item]}>
        {BaseFieldText[item]} : {path[item]}
      </p>
    );
  }

  return xhtml;
};

export const flattenObject = (obj) => {
  const _template = {};
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] !== "object") {
      _template[item] = obj[item]; // create exist value for Number || String field
    } else {
      // Handle with Object field
      // 2 case : Array || Object

      if (obj[item].length > 0) {
        // Handle with Array
        _template[item] = obj[item].map((elmt, i) => {
          if (typeof elmt !== "string") {
            return { ...elmt };
          } else {
            return elmt;
          }
        });
      } else {
        Object.keys(obj[item]).forEach((field) => {
          let newField = [item, field].join("_");
          _template[newField] = obj[item][field];
        });
      }
    }
  });
  return _template;
};

export const getPageMargins = () => {
  // return `@page { margin: 24px !important; }`;
  return `@page {
    padding:24px !important;
    display:block;
    box-sizing:border-box;
    break-after: always !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
  }
  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
    div {
      display: grid;
      page-break-inside: avoid;
    }
    .ant-typography {
      display: grid;
      page-break-inside: avoid;
    }
    h3 {
      display: grid;
      page-break-inside: avoid;
    }
  }
  `;
};

export function setLink(editor) {
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}

export const checkMoment = (date) => {
  if (!date.isValid) {
    console.log("this is not a moment object");
  } else {
    console.log("this is a moment object");
  }
};
