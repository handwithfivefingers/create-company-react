import React from "react";
import { Card, Row, Col } from "antd";
import moment from "moment";
import { FormFieldText, BaseFieldText } from "../../../contants/Common";
import { number_format, renderField } from "../../../helper/Common";
const PreviewData = ({ data }) => {
  //    base_val,
  //   company_main_career,
  //   company_opt,
  //   company_value,
  //    legal_respon,
  //   company_core,
  //   origin_person,
  //   per_main,
  //   present_person,
  return (
    <div>
      <Row gutter={[16, 12]}>
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
                  {FormFieldText["company_core"][item]} :{" "}
                  {data?.company_core[item]}
                </p>
              );
            }) || ""}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="card-boxShadow"
            title={FormFieldText["company_main_career"]}
          >
            <p key={data?.company_main_career}>
              {FormFieldText["company_main_career"]} :
              {data?.company_main_career}
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="card-boxShadow"
            title={FormFieldText["company_opt_career"]}
          >
            {(data.company_opt_career &&
              Object?.keys(data?.company_opt_career)?.map((item) => {
                return (
                  <p key={data?.company_opt_career[item]}>
                    {FormFieldText["company_opt_career"]} :
                    {data?.company_opt_career[item]}
                  </p>
                );
              })) ||
              "Không có ngành nghề khác"}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="card-boxShadow"
            title={FormFieldText["legal_respon"]}
          >
            {data?.legal_respon &&
              data?.legal_respon?.map((item, index) => {
                return (
                  (item &&
                    Object?.keys(item)?.map((field, i) => {
                      if (field === "birth_day")
                        return renderField(field, item, "birth_day", i);

                      if (field === "doc_time_provide")
                        return renderField(field, item, "doc_time_provide", i);

                      return renderField(field, item, null, i);
                    })) ||
                  ""
                );
              })}{" "}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="card-boxShadow"
            title={FormFieldText["company_value"]}
          >
            {data?.company_value && (
              <p>
                {FormFieldText["company_value"]} :{" "}
                {number_format(data?.company_value)} VND
              </p>
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="card-boxShadow"
            title={FormFieldText["origin_person"]}
          >
            {Object.keys(data?.origin_person)?.map((item) => {
              if (item === "doc_time_provide") {
                return renderField(
                  item,
                  data?.origin_person,
                  "doc_time_provide"
                );
              }

              if (item === "doc_type")
                return renderField(item, data?.origin_person, "doc_type");
              return renderField(item, data?.origin_person);
            })}
          </Card>
        </Col>
        <Col span={24}>
          <Card className="card-boxShadow" title={FormFieldText["per_main"]}>
            {Object.keys(data?.per_main)?.map((item) => {
              if (item === "gender")
                return renderField(item, data?.per_main, "gender");
              if (item === "birth_day")
                return renderField(item, data?.per_main, "birth_day");
              return renderField(item, data?.per_main);
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PreviewData;
