import { Drawer, Button, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { UserOutlined, ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../../styles/Layout.module.css';
import { useState } from 'react';
import CartDrawer from '../Cart';


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Header: React.FC = () => {

    const [open, setOpenCart] = useState(false);
    const showDrawer = () => {
        setOpenCart(true);
    };
    const onClose = () => {
        setOpenCart(false);
    };
    const num = 3;

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
                        <Button className={styles.cartButton} onClick={showDrawer} icon={<ShoppingCartOutlined className={styles.cartIcon} />} />
                        {/* <button className={styles.cartButton}><ShoppingCartOutlined className={styles.cartIcon} /></button> */}
                        <p className={styles.cartText}>$0.00</p>
                    </div>
                </div>
                <Drawer
                    title={`Cart (${num})`}
                    // placement={placement}
                    width={500}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    extra={<Button onClick={onClose} icon={<CloseOutlined className={styles.cartIcon} />} style={{ backgroundColor: '#5048E5', border: '0', color: '#FFFFFF' }} />}
                    className={styles.cartDrawer}
                    styles={{
                        header: { backgroundColor: "#5048E5", color: "#FFFFFF", }
                    }}
                >
                    <CartDrawer />
                </Drawer>
            </header>
        </>
    );
};

export default Header;