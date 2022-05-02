import React from "react";
import { Card, Row, Col, Typography, Descriptions } from "antd";
import moment from "moment";
import { FormFieldText, BaseFieldText } from "../../../contants/Common";
import { number_format, renderField, flattenObject } from "../../../helper/Common";
import { LABEL } from "src/contants/FormConstant";
import CCDescription from "src/components/CCDescription";
const PreviewData = ({ data }) => {
  let { pending, create_company, change_info, dissolution } = data;

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
    // for (let property in LABEL[pathName]) {
    //   let label = LABEL[pathName][property].fields;
    //   let newData = data[pathName][property];
    //   console.log(2);
    if (newData) {
      xhtml.push(getDataFromObj(newData, label));
    }
    // }
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

  const getDataFromObj = (objData, label, ind = null) => {
    let xhtml = [];
    console.log('getDataFromObj', objData, label);
    xhtml.push(
      Object.keys(objData).map((key, index) => {
        let currentPath = objData[key];
        console.log(4);
        if (currentPath) {
          console.log(5);
          return renderDescription(currentPath, label?.[key], key, index);
        }
      })
    );
    return xhtml;
  };

  /**
   *
   * @param {Obj Data} currentPath
   * @param {Loop Array Item} item
   * @param { current Label } label
   * @returns
   */
  const renderDescription = (item, label, keys = null, index1 = null, index2 = null) => {
    console.log(item, label)
    let itemVariable = checkVariable(item);
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
      return item.map((val, i) => {
        return (
          <CCDescription.DescListItem
            title={
              keys && keys === "legal_respon"
                ? `Người Đại Diện Pháp Luật ${i + 1}`
                : keys === "company_opt_career"
                ? `Ngành nghề phụ ${i + 1}`
                : ""
            }
          >
            {renderDescription(val, label, index1, i)}
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
      return getDataFromObj(item, label, index2 + 1);
    } else {
      console.log("item", item);
      return null
    }
  };

  const renderFormByArray = (array, name = "") => {
    let xhtml = null;
    xhtml = array?.map((item, index) => {
      if (Object.keys(item).length > 0) {
        return Object.keys(item).map((key) => {
          if (key.includes("time") || key.includes("birth")) {
            return (
              <Descriptions.Item label={[name, " ", index + 1]}>
                {moment(item[key]).format("YYYY-MM-DD")}
              </Descriptions.Item>
            );
          }
          if (name === "Ngành nghề phụ") {
            if (["code", "key", "value", "name"].includes(key)) return "";
            return <Descriptions.Item label={[name, " ", index + 1]}>{item["children"]}</Descriptions.Item>;
          }
          return <Descriptions.Item label={[name, " ", key, " ", index + 1]}>{item[key]}</Descriptions.Item>;
        });
      }
      return item;
    });

    return xhtml;
  };

  if (data) {
    let xhtml = [];
    for (var property in data) {
      for (let props in LABEL[property]) {
        let label = LABEL[property][props].fields;
        let newData = data[property][props];
        console.log(1, label)
        xhtml.push(
          <CCDescription.Desc layout="vertical" bordered title={renderTitle(newData, LABEL[property][props])}>
            {checkData(newData, label)}
          </CCDescription.Desc>
        );
      }
    }
    return xhtml;
  }
  return null;
};

export default PreviewData;
