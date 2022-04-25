import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, message, Spin, Input } from "antd";
import CCEditor from "../../Editor";
import { RiArrowGoBackFill, RiCloseFill } from "react-icons/ri";
import styles from "./styles.module.scss";
import axios from "src/config/axios";
import clsx from "clsx";

export default function TemplateMail(props) {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [subject, setSubject] = useState();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setContent(props.content);
      setSubject(props.data.subject);
    }
    return () => {
      setName();
      setContent();
      setSubject();
    };
  }, [props]);

  const handleSave = () => {
    if (name.length <= 1) return;
    let newContent = editorRef.current.getContent();
    if (newContent.length <= 1) return;
    setLoading(true);
    // console.log(newContent);
    // Add new

    if (props.type === 1) {
      axios
        .post("/api/admin/template/create", { name, content: newContent })
        .then((res) => {
          if (res.data.status === 201) {
            message.success(res.data.message);
          } else message.error(res.data.message);
        })
        .finally(() => {
          if (props.onFinishScreen) {
            props.onFinishScreen();
          }
          setLoading(false);
        });
    }
    if (props.type === 2) {
      axios
        .post(`/api/admin/template/edit/${props.data._id}`, {
          name,
          content: newContent,
          subject,
        })
        .then((res) => {
          if (res.data.status === 200) {
            message.success(res.data.message);
          } else message.error(res.data.message);
        })
        .finally(() => {
          if (props.onFinishScreen) {
            props.onFinishScreen();
          }
          setLoading(false);
        });
    }
  };

  return (
    <div className={styles.mail}>
      <Input size="middle" placeholder={"Tiêu đề"} value={name} onChange={(e) => setName(e.target.value)} />

      <Input size="middle" placeholder={"Subject"} value={subject} onChange={(e) => setSubject(e.target.value)} />

      <CCEditor content={content} ref={editorRef} />

      <Button className={styles.submit} onClick={handleSave}>
        Submit
      </Button>

      <div
        className={clsx([styles.loading], {
          [styles.loadingActive]: loading,
        })}
      >
        <Spin spinning={loading} />
      </div>
    </div>
  );
}
