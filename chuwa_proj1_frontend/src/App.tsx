import Layout from './components/layout/index';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
// import './App.css'

function App() {
  return (
    <div className='app'>
      <Layout>
        <ProductsPage />
        {/* <ProductDetailPage /> */}
      </Layout>
    </div>
  )
}

export default App
