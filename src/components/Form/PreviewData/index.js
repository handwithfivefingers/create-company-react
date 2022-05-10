import React from "react";
import { Card, Row, Col, Typography, Descriptions } from "antd";
import moment from "moment";
import { FormFieldText, BaseFieldText } from "../../../contants/Common";
import { number_format, renderField, flattenObject } from "../../../helper/Common";
import { LABEL } from "src/contants/FormConstant";
import CCDescription from "src/components/CCDescription";
const PreviewData = ({ data }) => {
  // console.log(data, "data");

  const renderTitle = (newData, label) => {
    let xhtml = "";
    for (let property in label) {
      xhtml = [newData && label?.title];
    }
    return xhtml;
  };

  // const checkData = (pathName) => {
  //   let xhtml = [];
  //   for (let property in LABEL[pathName]) {
  //     let label = LABEL[pathName][property].fields;
  //     xhtml.push(
  //       Object.keys(label).map((item) => {
  //         console.log("data valid");
  //         return data?.[pathName]?.[property]?.[item] ? (
  //           <Descriptions.Item key={[pathName, item]} label={label?.[item]}>
  //             {data?.[pathName]?.[property]?.[item]}
  //           </Descriptions.Item>
  //         ) : (
  //           ""
  //         );
  //       })
  //     );
  //   }

  //   return xhtml;
  // };

  const checkData = (newData, label) => {
    let xhtml = [];
    if (newData) {
      xhtml.push(getDataFromObj(newData, label));
    }
    return xhtml;
  };

  const checkVariable = (val) => {
    // console.log("checkVariable", val, Array.isArray(val));
    if (typeof val === "string" || typeof val === "number") {
      return "String";
    } else if (Array.isArray(val)) {
      return "Array";
    } else if (moment.isMoment(val)) {
      return "Moment";
    } else if (typeof val === "object" && Object.keys(val).length > 0) {
      return "Object";
    } else return typeof val;
  };

  const getDataFromObj = (objData, label) => {
    let xhtml = [];
    // console.log("getDataFromObj", objData, label);
    xhtml.push(
      Object.keys(objData).map((key, index) => {
        let currentPath = objData[key];
        // console.log(4);
        if (currentPath) {
          // console.log(5);
          return renderDescription(currentPath, label?.[key], key, index);
        }
      })
    );
    return xhtml;
  };

  const checkTitle = (keys, index) => {
    if (keys === "legal_respon") {
      return `Người Đại Diện Pháp Luật ${index + 1}`;
    } else if (keys === "company_opt_career") {
      return `Ngành nghề phụ ${index + 1}`;
    }
    return "";
  };
  /**
   *
   * @param {current Obj || Array || String} item
   * @param {current Label Path} label
   * @param {*} keys
   * @param {*} index1
   * @param {*} index2
   * @returns
   */
  const renderDescription = (item, label, keys = null, index1 = null, index2 = null) => {
    let itemVariable = checkVariable(item);
    // {name, key , value}
    console.log(item, label, keys, index1, index2);

    if (itemVariable === "String") {
      return (
        <CCDescription.DescItem
          key={[label, index2 > 0 ? [" - ", index2 + 1] : ""]}
          label={[label, index2 > 0 ? [" - ", index2 + 1] : ""]}
        >
          {[item]}
        </CCDescription.DescItem>
      );
    } else if (itemVariable === "Array") {
      return item.map((arrayItem, arrayIndex) => {
        if (keys === "company_opt_career") {
          let careerObj = [arrayItem.name];
          return (
            <CCDescription.DescListItem title={checkTitle(keys, arrayIndex)}>
              {renderDescription(careerObj, label, index1, arrayIndex)}
            </CCDescription.DescListItem>
          );
        } else
          return (
            <CCDescription.DescListItem title={checkTitle(keys, arrayIndex)}>
              {renderDescription(arrayItem, label, index1, arrayIndex)}
            </CCDescription.DescListItem>
          );
      });
    } else if (itemVariable === "Moment") {
      return (
        <CCDescription.DescItem key={[label, index1]} label={[label, index2 > 0 ? [" - ", index2 + 1] : ""]}>
          {moment(item).format("YYYY-MM-DD")}
        </CCDescription.DescItem>
      );
    } else if (itemVariable === "Object") {
      return getDataFromObj(item, label);
    } else {
      console.log("item", item);
      return null;
    }
  };

  // const renderFormByArray = (array, name = "") => {
  //   let xhtml = null;
  //   xhtml = array?.map((item, index) => {
  //     if (Object.keys(item).length > 0) {
  //       return Object.keys(item).map((key) => {
  //         if (key.includes("time") || key.includes("birth")) {
  //           return (
  //             <Descriptions.Item label={[name, " ", index + 1]}>
  //               {moment(item[key]).format("YYYY-MM-DD")}
  //             </Descriptions.Item>
  //           );
  //         }
  //         if (name === "Ngành nghề phụ") {
  //           if (["code", "key", "value", "name"].includes(key)) return "";
  //           return <Descriptions.Item label={[name, " ", index + 1]}>{item["children"]}</Descriptions.Item>;
  //         }
  //         return <Descriptions.Item label={[name, " ", key, " ", index + 1]}>{item[key]}</Descriptions.Item>;
  //       });
  //     }
  //     return item;
  //   });

  //   return xhtml;
  // };

  if (data) {
    let xhtml = [];
    for (var property in data) {
      for (let props in LABEL[property]) {
        let label = LABEL[property][props].fields;
        let newData = data[property][props];
        xhtml.push(
          newData && (
            <CCDescription.Desc layout="vertical" bordered title={renderTitle(newData, LABEL[property][props])}>
              {checkData(newData, label)}
            </CCDescription.Desc>
          )
        );
      }
    }
    return xhtml;
  }
  return null;
};

export default PreviewData;
