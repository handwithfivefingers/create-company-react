import { CaretLeftOutlined, CaretRightOutlined, DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { memo, useCallback, useEffect, useState } from "react";
import { LAYOUT_ROUTER, UserRouter } from "../../../contants/Route";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "src/store/actions";

const { Sider } = Layout;

const UserSidebar = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [current, setCurrent] = useState();
  const authReducer = useSelector((state) => state.authReducer);
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };

  useEffect(() => {
    if (location.pathname.includes("/user/order")) setCurrent("/user/order");
    else setCurrent(location.pathname);
  }, [location]);

  const renderSidebar = useCallback((route) => {
    console.log("1");
    let xhtml = null;
    let routeByRole = route.filter((item) => item.path === "/user");
    xhtml = routeByRole.map((item, i) => {
      if (item.children) {
        return item.children.map((child) => {
          console.log(child);
          return (
            <Menu.Item key={`${item.path}/${child.path}`} icon={child?.icon || <PieChartOutlined />}>
              <Link to={child.path}>{child.title}</Link>
            </Menu.Item>
          );
        });
      }
      return (
        <Menu.Item key={item.path} icon={item?.icon || <PieChartOutlined />}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      );
    });
    return xhtml;
  }, []);

  const signOut = async () => {
    await dispatch(AuthAction.AuthLogout());
    navigate("/");
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
          <Menu.Item key={"/"} icon={<PieChartOutlined />}>
            <Link to={"/"}>Trang chủ</Link>
          </Menu.Item>
          {renderSidebar(LAYOUT_ROUTER(authReducer))}
          {/* <Menu.Item>Đổi mật khẩu</Menu.Item> */}
          <Menu.Item onClick={() => signOut()} icon={<DesktopOutlined />}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default React.memo(UserSidebar);
