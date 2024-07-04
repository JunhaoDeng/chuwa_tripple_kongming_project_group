import Layout from './components/Layout';
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
