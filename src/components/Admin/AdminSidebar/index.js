import { CaretLeftOutlined, CaretRightOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
// import { signOut } from "next-auth/react";
import { Link, useLocation } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AdminRouter } from "src/contants/Route";
import styles from "./styles.module.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [current, setCurrent] = useState();
  let location = useLocation();

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };
  const signOut = () => {
    console.log("hi");
  };
  const renderSidebar = (route) => {
    let xhtml = null;
    xhtml = route.map((item, i) => {
      if (item.submenu) {
        return (
          <Menu.SubMenu
            href={item.path}
            title={
              <Link to={item.path}>
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
          <Link to={item.path}>
            <a>{item.name}</a>
          </Link>
        </Menu.Item>
      );
    });
    return xhtml;
  };
  useEffect(() => {
    if (location.pathname.includes("/admin/order")) setCurrent("/admin/order");
    else setCurrent(location.pathname);
  }, [location]);
  return (
    <>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={onCollapse}
        collapsedWidth={50}
        reverseArrow={true}
        trigger={<div className={styles.trigger}>{!collapse ? <CaretLeftOutlined /> : <CaretRightOutlined />}</div>}
      >
        <div className="logo" style={{ height: 64 }} />
        <Menu theme="dark" defaultSelectedKeys={[current]} selectedKeys={[current]} mode="inline">
          <Menu.Item key={"/"} icon={<PieChartOutlined />}>
            <Link to={"/"}>
              <a>Trang chủ</a>
            </Link>
          </Menu.Item>
          {renderSidebar(AdminRouter)}
          <Menu.Item onClick={() => signOut()} icon={<RiLogoutCircleLine />}>
            <a> Đăng xuất</a>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default AdminSidebar;
