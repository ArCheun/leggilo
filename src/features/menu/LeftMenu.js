import React, {useState} from "react";
import {Image, Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

export const LeftMenu = () => {

    const [collapsed, setCollapsed] = useState(true);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className={collapsed ? "logo logo-icon" : "logo"}>
                <Image preview={false} src={collapsed ? "logo-icon.png" : "logo.png"}/>
            </div>
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1" icon={<MenuOutlined/>}>Article Feed</Menu.Item>
            </Menu>
        </Sider>
    );

}
