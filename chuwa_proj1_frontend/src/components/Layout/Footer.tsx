import { YoutubeFilled, TwitterOutlined, FacebookFilled } from '@ant-design/icons';
import styles from '../../styles/Layout.module.css';

const Footer: React.FC = () => {
    return (
        <>
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

export default Footer;