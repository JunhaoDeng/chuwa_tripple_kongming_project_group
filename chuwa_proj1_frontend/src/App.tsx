import Layout from './components/layout/index';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import store from './redux/store';
import { Provider } from 'react-redux';
import SignUpForm from './components/SignupForm';
import CreateProductForm from './components/CreateProductForm';
// import './App.css'

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Layout>
          {/* <ProductsPage /> */}
          {/* <ProductDetailPage /> */}
          {/* <SignUpForm /> */}
          <CreateProductForm />
        </Layout>
      </Provider>
      
    </div>
  )
}

export default App
