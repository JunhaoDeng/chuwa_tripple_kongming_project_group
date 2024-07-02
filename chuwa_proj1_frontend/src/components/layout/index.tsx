import React from 'react';
import { Layout, Input, theme } from 'antd';
import { UserOutlined, ShoppingCartOutlined, YoutubeFilled, TwitterOutlined, FacebookFilled } from '@ant-design/icons';
import styles from '../../styles/Layout.module.css';
import type { SearchProps } from 'antd/es/input/Search';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const WebLayout: React.FC = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Header className={styles.header} >
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Management</h1>
          <h1 className={styles.titleMobile}>M</h1>
          <p className={styles.subtitle}>Chuwa</p>
        </div>
        <Search className={styles.searchBar} placeholder="Search" allowClear onSearch={onSearch} />
        <div className={styles.userFieldWrapper}>
          <div className={styles.userWrapper}>
            <UserOutlined className={styles.userIcon} />
            <a className={styles.signLink} href="#">Sign In</a>
          </div>
          <div className={styles.cartWrapper}>
            <button className={styles.cartButton}><ShoppingCartOutlined className={styles.cartIcon} /></button>
            <p className={styles.cartText}>$0.00</p>
          </div>
        </div>

      </Header>
      <Content className={styles.main}>
        {/* <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div> */}
      </Content>
      <Footer className={styles.footer}>
        ©{new Date().getFullYear()} All Rights Reserved
        <ul className={styles.iconsWrapper}>
          <li><YoutubeFilled style={{ color: '#FFFFFF' }} /></li>
          <li><TwitterOutlined style={{ color: '#FFFFFF' }} /></li>
          <li><FacebookFilled style={{ color: '#FFFFFF' }} /></li>
        </ul>
        <ul className={styles.footerMenu}>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Privacy Policies</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </Footer>
    </Layout>
  );
};

export default WebLayout;