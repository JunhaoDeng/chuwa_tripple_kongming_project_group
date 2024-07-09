import Layout from "./components/Layout/index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import SignUpForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import UpdatePwdForm from "./components/UpdatePwdForm";
import CreateProductForm from "./components/CreateProductForm";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/update-password" element={<UpdatePwdForm />} />
              <Route path="/update-success" element={<SigninForm />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/create" element={<CreateProductForm />} />
              <Route
                path="/products/:productId/edit"
                element={<CreateProductForm />}
              />
              <Route
                path="/products/:productId/detail"
                element={<ProductDetailPage />}
              />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
          {/* <ProductsPage /> */}
          {/* <ProductDetailPage /> */}
          {/* <SignUpForm /> */}
          {/* <SigninForm /> */}
          {/* <CreateProductForm /> */}
          {/* <UpdatePwdForm /> */}
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
