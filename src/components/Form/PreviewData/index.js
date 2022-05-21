import React from "react";
import moment from "moment";
import { LABEL } from "src/contants/FormConstant";
import CCDescription from "src/components/CCDescription";

const listOfFields = ["company_opt_career", "include", "exclude", "detail_after", "company_main_career"];

const PreviewData = ({ data }) => {
  const renderTitle = (newData, label) => {
    let xhtml = "";
    for (let property in label) {
      xhtml = [newData && label?.title];
    }
    return xhtml;
  };

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

  const checkTitle = (keys, index = null) => {
    switch (keys) {
      case "legal_respon":
        return `Người Đại Diện Pháp Luật ${index + 1}`;
      case "company_opt_career":
        return `Ngành nghề phụ ${index + 1}`;
      case "company_main_career":
        return `Ngành nghề chính`;
      case "detail_after":
        return `Sửa đổi chi tiết ngành, nghề ${index + 1}`;
      case "exclude":
        return `Bỏ ngành, nghề ${index + 1}`;
      case "include":
        return `Ngành nghề bổ sung ${index + 1}`;
      default:
        return "";
    }
    // return "";
  };
  /**
   *
   * @param {current Obj || Array || String} item
   * @param {current Label Path} label
   * @param {field Name} keys
   * @param {*} index1
   * @param {*} index2
   * @returns
   */
  const renderDescription = (item, label, keys = null, index1 = null, index2 = null) => {
    let itemVariable = checkVariable(item);

    // console.log("item", item, "label", label, "keys", keys, "index1", index1, "index2", index2);

    let isSpecial = handleSpecialFields(keys);

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
        // Special Fields ....

        if (isSpecial) {
          let specialObject = [arrayItem.name];
          return (
            <CCDescription.DescListItem title={checkTitle(keys, arrayIndex)}>
              {renderDescription(specialObject, label, index1, arrayIndex)}
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
          {moment(item).format("DD/MM/YYY")}
        </CCDescription.DescItem>
      );
    } else if (itemVariable === "Object") {
      if (isSpecial) {
        return (
          <CCDescription.DescItem
            key={[label, index2 > 0 ? [" - ", index2 + 1] : ""]}
            label={[label, index2 > 0 ? [" - ", index2 + 1] : ""]}
          >
            {[item.name]}
          </CCDescription.DescItem>
        );
      }
      return getDataFromObj(item, label);
    } else {
      console.log("item", item);
      return null;
    }
  };

  const handleSpecialFields = (field) => {
    return listOfFields.some((item) => item === field);
  };

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
