import styles from '../../styles/Layout.module.css';
import { Layout, Input, theme } from 'antd';
import { UserOutlined, ShoppingCartOutlined, YoutubeFilled, TwitterOutlined, FacebookFilled } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import Products from '../../pages/Products';
import ProductDetail from '../../pages/ProductDetail';
import SigninForm from '../SigninForm';
import SignUpForm from '../SignupForm';
import UpdatePwdForm from '../UpdatePwdForm';


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const WebLayout: React.FC = () => {

    return (
        <>
            <header className={styles.header}>
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
            </header>
            <main style={{margin: "0rem", backgroundColor: '#F9FAFB'}}>
                <ProductDetail />
              {
          // <SignUpForm />
          // <SigninForm />
          // <UpdatePwdForm />
          }
            </main>
            <footer className={styles.footer}>
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
            </footer>
        </>
    );
};

export default WebLayout;