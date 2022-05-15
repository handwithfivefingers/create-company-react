import React, { forwardRef } from "react";
import { Form, Row, Col } from "antd";
import CCInput from "src/components/CCInput";

export default ThanhVienGopVon = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h3>Thành viên góp vốn</h3>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 2,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <CCInput
            type="select"
            label="Người đại diện"
            name={[...BASE_FORM, "present_person"]}
            onSelect={(e) => setFormData({ ...formData, present_person: e })}
            defaultValue="personal"
            options={[
              { value: "personal", name: "Người đại diện là cá nhân" },
              { value: "organization", name: "Người đại diện là tổ chức" },
            ]}
          />
        </Col>
        <Col span={24}>
          {formData?.present_person === "personal" ? (
            <div className={styles.groupInput}>
              <CCInput
                type="text"
                name={[...BASE_FORM, "origin_person", "name"]}
                label={FormFieldText["origin_person"]}
              />
              <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" />
              <CCInput
                type="select"
                name={[...BASE_FORM, "origin_person", "gender"]}
                label="Giới tính"
                options={[
                  { value: "Nữ", name: "Nữ" },
                  { value: "Nam", name: "Nam" },
                ]}
              />
              <CCInput type="text" name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" />

              <CCInput
                type="text"
                name={[...BASE_FORM, "origin_person", "national"]}
                defaultValue="Việt Nam"
                label="Quốc tịch"
              />
              <Form.Item name={[...BASE_FORM, "origin_person", "reg_address"]} label="Nơi đăng kí hộ khẩu thường trú">
                <Input />
              </Form.Item>

              <CCInput type="text" name={[...BASE_FORM, "origin_person", "current_address"]} label="Chỗ ở hiện tại" />
              <CCInput
                type="select"
                name={[...BASE_FORM, "origin_person", "doc_type"]}
                label="Loại giấy tờ"
                defaultValue="Chứng minh nhân dân"
                options={[
                  {
                    name: "Chứng minh nhân dân",
                    value: "Chứng minh nhân dân",
                  },
                  { name: "Căn cước công dân", value: "Căn cước công dân" },
                  { name: "Hộ chiếu", value: "Hộ chiếu" },
                ]}
              />
              <CCInput
                type="text"
                label={"Số CMND/ CCCD/ Hộ chiếu"}
                name={[...BASE_FORM, "origin_person", "doc_code"]}
              />
              <CCInput type="date" name={[...BASE_FORM, "origin_person", "doc_time_provide"]} label="Ngày cấp" />

              <CCInput type="text" name={[...BASE_FORM, "origin_person", "doc_place_provide"]} label="Nơi cấp" />
              <CCInput
                type="number"
                formatter={(val) => `${number_format(val)}`}
                style={{ width: "100%" }}
                name={[...BASE_FORM, "company_value"]}
                label="Giá trị góp vốn"
              />
              {/* + Tên thành viên
                  + Ngày sinh
                  + Giới tính
                  + Dân tộc
                  + Quốc tịch: Luôn hiển thị là “Việt Nam” (có thể chỉnh sửa)
                  + Nơi đăng ký hộ khẩu thường trú
                  + Chỗ ở hiện tại
                  + Loại giấy tờ pháp lý (dropdown 3 options): Chứng minh nhân dân/căn cước công dân/hộ chiếu + field điền số
                  + Ngày cấp, nơi cấp
                  + Giá trị góp vốn */}
            </div>
          ) : (
            <div className={styles.groupInput}>
              {/* + Tên người đại diện
                  + Ngày sinh
                  + Giới tính
                  + Dân tộc
                  + Quốc tịch: Luôn hiển thị là “Việt Nam” (có thể chỉnh sửa)
                  + Địa chỉ liên lạc
                  + Địa chỉ trụ sở chính
                  + Loại giấy tờ pháp lý: Mã doanh nghiệp + field điền số
                  + Ngày cấp, nơi cấp
                  + Giá trị góp vốn */}

              <CCInput type="text" name={[...BASE_FORM, "origin_person", "name"]} label={"Tên người đại diện"} />
              <CCInput type="date" name={[...BASE_FORM, "origin_person", "birth_day"]} label="Ngày sinh" />
              <CCInput
                type="select"
                name={[...BASE_FORM, "origin_person", "gender"]}
                label="Giới tính"
                options={[
                  { value: "Nữ", name: "Nữ" },
                  { value: "Nam", name: "Nam" },
                ]}
              />
              <CCInput type="text" name={[...BASE_FORM, "origin_person", "per_type"]} label="Dân tộc" />

              <CCInput
                type="text"
                name={[...BASE_FORM, "origin_person", "national"]}
                label="Quốc tịch"
                defaultValue="Việt Nam"
              />
              <Form.Item name={[...BASE_FORM, "origin_person", "reg_address"]} label="Địa chỉ liên lạc">
                <Input />
              </Form.Item>

              <CCInput
                type="text"
                name={[...BASE_FORM, "origin_person", "current_address"]}
                label="Địa chỉ trụ sở chính"
              />

              <CCInput
                type="select"
                name={[...BASE_FORM, "origin_person", "doc_type"]}
                label="Loại giấy tờ"
                defaultValue="Mã doanh nghiệp"
                disabled
                defaultActiveFirstOption
                options={[
                  {
                    name: "Mã doanh nghiệp",
                    value: "Mã doanh nghiệp",
                  },
                ]}
              />
              <CCInput type="text" label={"Mã doanh nghiệp"} name={[...BASE_FORM, "origin_person", "doc_code"]} />
              <CCInput type="date" name={[...BASE_FORM, "origin_person", "doc_time_provide"]} label="Ngày cấp" />

              <CCInput type="text" name={[...BASE_FORM, "origin_person", "doc_place_provide"]} label="Nơi cấp" />
              <CCInput
                type="number"
                formatter={(val) => `${number_format(val)}`}
                style={{ width: "100%" }}
                name={[...BASE_FORM, "company_value"]}
                label="Giá trị góp vốn"
              />
              <CCInput
                type="number"
                formatter={(val) => `${number_format(val)}`}
                style={{ width: "100%" }}
                name={[...BASE_FORM, "company_value"]}
                label="Giá trị góp vốn"
              />
            </div>
          )}
        </Col>
      </Row>
    </Form.Item>
  );
});
