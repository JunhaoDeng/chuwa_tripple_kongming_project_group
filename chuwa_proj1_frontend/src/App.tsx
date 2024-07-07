import Layout from './components/Layout/index';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import store from './redux/store';
import { Provider } from 'react-redux';
import SignUpForm from './components/SignupForm';
import CreateProductForm from './components/CreateProductForm';
import SigninForm from './components/SigninForm';
// import './App.css'

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Layout>
          {/* <ProductsPage /> */}
          {/* <ProductDetailPage /> */}
          <SigninForm />
          {/* <CreateProductForm /> */}
        </Layout>
      </Provider>
      
    </div>
  )
}

export default App
