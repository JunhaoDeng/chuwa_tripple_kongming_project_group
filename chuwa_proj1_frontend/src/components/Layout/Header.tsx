import { Drawer, Button, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { UserOutlined, ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../../styles/Layout.module.css';
import { useEffect, useState } from 'react';
import CartDrawer from '../Cart';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Header: React.FC = () => {
    
    const [open, setOpenCart] = useState(false);

    // const [queryparams] = useSearchParams();

    const showDrawer = () => {
        window.location.href = "/products?showdrawer=1";
        // setOpenCart(true);
    };
    const onClose = () => {
        window.location.href = "/products?showdrawer=0";
        // setOpenCart(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tokenDec, setTokenDec] = useState<any>(null);

    const subtotal = useSelector((state: RootState) => state.cart.subtotal);
    const cartCount = useSelector((state: RootState) => state.cart.count);

    useEffect(() => {
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch (err) {
            console.log("token invalid");
        }
        setTokenDec(decoded);

        const equalloc: number = window.location.href.indexOf("=")
        if (equalloc === -1) {
            setOpenCart(false);
        } else {
            const val: string = window.location.href.slice(equalloc + 1);
            if (val ==='1') {
                setOpenCart(true);
            } else {
                setOpenCart(false);
            }
        }
    }, [])
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
                        {tokenDec !== null ?
                            <span className={styles.signLink}>{tokenDec.email}</span> :
                            <a className={styles.signLink} href="/signin">Sign In</a>}

                    </div>
                    <div className={styles.cartWrapper}>
                        <Button className={styles.cartButton} onClick={showDrawer} icon={<ShoppingCartOutlined className={styles.cartIcon} />} >
                            {cartCount === 0 ? <></> : <div className={styles.cartQty}>{cartCount}</div>}
                        </Button>
                        {/* <div className={styles.cartQty}>{cartCount}</div> */}


                        {/* <button className={styles.cartButton}><ShoppingCartOutlined className={styles.cartIcon} /></button> */}
                        <p className={styles.cartText}>${(subtotal /100).toFixed(2)}</p>
                    </div>
                </div>
                <Drawer
                    title={`Cart (${cartCount})`}
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