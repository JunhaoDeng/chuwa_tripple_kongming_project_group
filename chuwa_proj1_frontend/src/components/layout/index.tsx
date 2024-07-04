import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ margin: "0rem", backgroundColor: '#F9FAFB' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;