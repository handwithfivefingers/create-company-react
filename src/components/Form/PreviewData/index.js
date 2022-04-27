import React from "react";
import { Card, Row, Col, Typography, Descriptions } from "antd";
import moment from "moment";
import { FormFieldText, BaseFieldText } from "../../../contants/Common";
import { number_format, renderField, flattenObject } from "../../../helper/Common";

const PreviewData = ({ data }) => {
  let { pending, create_company, change_info, dissolution } = data;

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
          return <Descriptions.Item label={[name, " ", key , " ", index + 1]}>{item[key]}</Descriptions.Item>;
        });
      }
      return item;
    });

    return xhtml;
  };

  if (pending) {
    return (
      <div>
        <Descriptions title="Tạm ngưng">
          {Object.keys(pending).map((item) => (
            <Descriptions.Item label={item}>{pending[item]}</Descriptions.Item>
          ))}
        </Descriptions>
      </div>
    );
  }
  if (create_company) {
    let flatten = flattenObject(create_company);

    console.log(flatten);

    return (
      <Descriptions title=" Thành lập doanh nghiệp">
        {Object.keys(flatten).map((key) => {
          if (typeof flatten[key] === "string") {
            return <Descriptions.Item label={key}>{flatten[key]}</Descriptions.Item>;
          }
          if (key === "legal_respon") {
            return renderFormByArray(flatten[key], "Người đại diện");
          }

          if (key === "company_opt_career") {
            return renderFormByArray(flatten[key], "Ngành nghề phụ");
          }

          if (key.includes("time") || key.includes("birth")) {
            return <Descriptions.Item label={key}>{moment(flatten[key]).format("YYYY-MM-DD")}</Descriptions.Item>;
          }

          return "";
        })}
      </Descriptions>
    );
  }
  if (change_info) {
    console.log(change_info);
  }
  if (dissolution) {
    console.log(dissolution);
  }
  return (
    <div>
      {/* <Row gutter={[16, 12]}>
        <Col span={24}>
          <Card className="card-boxShadow" title="Loại hình doanh nghiệp">
            <p>{FormFieldText["selectProduct"]}</p>
          </Card>
        </Col>

        <Col span={24}>
          <Card className="card-boxShadow" title="Vốn điều lệ">
            {Object.keys(data?.base_val)?.map((item) => {
              return (
                <p key={data?.base_val[item]}>
                  {FormFieldText["base_val"][item]} : {data?.base_val[item]}
                </p>
              );
            })}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title="Công ty">
            {Object.keys(data?.company_core)?.map((item) => {
              return (
                <p key={data?.company_core[item]}>
                  {FormFieldText["company_core"][item]} : {data?.company_core[item]}
                </p>
              );
            }) || ""}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["company_main_career"]}>
            <p key={data?.company_main_career}>
              {FormFieldText["company_main_career"]} :{data?.company_main_career}
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["company_opt_career"]}>
            {(data.company_opt_career &&
              Object?.keys(data?.company_opt_career)?.map((item) => {
                return (
                  <p key={data?.company_opt_career[item]}>
                    {FormFieldText["company_opt_career"]} :{data?.company_opt_career[item]}
                  </p>
                );
              })) ||
              "Không có ngành nghề khác"}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["legal_respon"]}>
            {data?.legal_respon &&
              data?.legal_respon?.map((item, index) => {
                return (
                  (item &&
                    Object?.keys(item)?.map((field, i) => {
                      if (field === "birth_day") return renderField(field, item, "birth_day", i);

                      if (field === "doc_time_provide") return renderField(field, item, "doc_time_provide", i);

                      return renderField(field, item, null, i);
                    })) ||
                  ""
                );
              })}{" "}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["company_value"]}>
            {data?.company_value && (
              <p>
                {FormFieldText["company_value"]} : {number_format(data?.company_value)} VND
              </p>
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["origin_person"]}>
            {Object.keys(data?.origin_person)?.map((item) => {
              if (item === "doc_time_provide") {
                return renderField(item, data?.origin_person, "doc_time_provide");
              }

              if (item === "doc_type") return renderField(item, data?.origin_person, "doc_type");
              return renderField(item, data?.origin_person);
            })}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["per_main"]}>
            {Object.keys(data?.per_main)?.map((item) => {
              if (item === "gender") return renderField(item, data?.per_main, "gender");
              if (item === "birth_day") return renderField(item, data?.per_main, "birth_day");
              return renderField(item, data?.per_main);
            })}
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default PreviewData;
