import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Space, Upload } from "antd";
import WithAuth from "src/components/HOC/WithAuth";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "src/config/axios";

const Admin = (props) => {
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState([]);
  const formRef = React.useRef();

  const onFinish = async (val) => {
    setLoading(true);
    const res = await axios.post(`/api/payment`, val);
    // console.log(res);
    if (res.status === 200) {
      return (window.location.href = res.data.url);
    }
  };

  const handleSendMailWithAttach = () => {
    let { email, attachments } = formRef.current.getFieldsValue();
    const form = new FormData();
    attachments?.fileList?.map((item) => {
      form.append("attachments", item.originFileObj);
    });
    form.append("email", email);
    setLoading(true);
    axios
      .post("/api/sendmail", form)
      .then((res) => {
        let msg = res.data.message;
        message.success(`${msg} -> Email: ${[res.data.info.accepted].join("")}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    axios
      .post("/api/upload/cloud")
      .then((res) => {
        const sign = res.data;
        const formData = new FormData();
        let { file } = formRef.current.getFieldsValue();
        let all = file?.fileList?.map((item) => {
          formData.append("file", item.originFileObj);
          formData.append("api_key", sign.apikey);
          formData.append("timestamp", sign.timestamp);
          formData.append("signature", sign.signature);
          formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
          formData.append("folder", "pdf_file");
          return fetch(`https://api.cloudinary.com/v1_1/${sign.cloudname}/auto/upload`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              return JSON.parse(data);
            });
        });

        Promise.all(all)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    {
      /**
      data Return : 
      api_key: "776779258413574"
      asset_id: "114fd481dad197ecf2b7ce96d5646bae"
      bytes: 77332
      created_at: "2022-01-18T05:41:39Z"
      eager: (2) [{…}, {…}]
      etag: "b8ff80be22212b1d10549dc13b6eaf15"
      format: "pdf"
      height: 842
      original_filename: "Mai-Van-Truyen-TopCV.vn-040618.135734"
      pages: 1
      placeholder: false
      public_id: "pdf_file/sq9uqgqq3lt9pyffmya2"
      resource_type: "image"
      secure_url: "https://res.cloudinary.com/dojswen0t/image/upload/v1642484499/pdf_file/sq9uqgqq3lt9pyffmya2.pdf"
      signature: "fb195e052f0b4cbe520745c8f9d75ed1163f52c3"
      tags: []
      type: "upload"
      url: "http://res.cloudinary.com/dojswen0t/image/upload/v1642484499/pdf_file/sq9uqgqq3lt9pyffmya2.pdf"
      version: 1642484499
      version_id: "264f6a4c8c91aaaf23fb7db8a501fe08"
      width: 601
      */
    }
  };

  // https://api.cloudinary.com/v1_1/${cloudName}/upload
  console.log("admin", props);
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithAuth(Admin, "admin");
