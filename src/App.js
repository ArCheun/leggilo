import React from 'react';
import './App.css';
import {Layout, Row, Col, Image} from 'antd';
import {PostsList} from "./features/posts/PostsList";
import {LeftMenu} from "./features/menu/LeftMenu";
import {useDispatch} from "react-redux";
import {PostsFilter} from "./features/filters/PostsFilter";
import {fetchProviders} from "./features/providers/providersSlice";

const {Content, Footer,} = Layout;

function App() {

    const dispatch = useDispatch();
    dispatch(fetchProviders());

    return (
        <div id="lglo-app-container">
            <Layout id="lglo-app-layout">
                <LeftMenu/>
                <Layout>
                    <Row>
                        <Col span={22}>
                            <Content id="lglo-app-content">
                                <div id="lglo-app-post-filter-container">
                                    <PostsFilter/>
                                </div>
                                <div id="lglo-app-post-list-container">
                                    <PostsList/>
                                </div>
                            </Content>
                            <Footer id="lglo-app-footer">
                                leggilo | <Image width={10} preview={false} src={"favicon.png"}/>runa tebel - archeun
                                ©2021
                            </Footer>
                        </Col>
                    </Row>
                </Layout>
            </Layout>

        </div>
    );
}

export default App;
