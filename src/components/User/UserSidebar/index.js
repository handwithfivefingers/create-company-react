import React, { useState, useEffect } from "react";
import { UserRouter } from "../../../contants/Route";
import { Layout, Menu, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const { Sider } = Layout;

const UserSidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [current, setCurrent] = useState();
  const router = useRouter();
  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };

  useEffect(() => {
    if (router.pathname.includes("/user/order")) setCurrent("/user/order");
    else setCurrent(router.pathname);
  }, [router]);

  const renderSidebar = (route) => {
    let xhtml = null;
    xhtml = route.map((item, i) => {
      if (item.submenu) {
        return (
          <Menu.SubMenu
            key={item.path}
            title={
              <Link href={item.path}>
                <a
                  style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  {item.name}
                </a>
              </Link>
            }
          >
            {renderSidebar(item.submenu)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path} icon={item?.icon || <PieChartOutlined />}>
          <Link href={item.path}>
            <a>{item.name}</a>
          </Link>
        </Menu.Item>
      );
    });
    return xhtml;
  };

  return (
    <>
      <Sider
        collapsedWidth={50}
        collapsible
        collapsed={collapse}
        onCollapse={onCollapse}
        breakpoint={"md"}
        reverseArrow={true}
        trigger={<div className={styles.trigger}>{!collapse ? <CaretLeftOutlined /> : <CaretRightOutlined />}</div>}
      >
        <div className="logo" style={{ height: 64 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[current]} selectedKeys={[current]}>
          <Menu.Item key={"1"} icon={<PieChartOutlined />}>
            <Link href={"/"}>
              <a>Trang chủ</a>
            </Link>
          </Menu.Item>
          {renderSidebar(UserRouter)}
          {/* <Menu.Item>Đổi mật khẩu</Menu.Item> */}
          <Menu.Item onClick={() => signOut()} icon={<DesktopOutlined />}>
            <a>Đăng xuất</a>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default UserSidebar;
