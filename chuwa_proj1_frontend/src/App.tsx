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
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmailNotification from "./components/EmailNotification";
import ProtectedRoute from "./components/ProtectedRoute";
// import './App.css'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute element= {
                  <Navigate to="/products" replace />
                }/>
              } />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/update-password" element={<UpdatePwdForm />} />
              <Route path="/update-success" element={<EmailNotification />}/>
              <Route path="/products" element={
                <ProtectedRoute element= {<ProductsPage />}/>
              } />
              <Route path="/products/create" element={
                <ProtectedRoute element= {<CreateProductForm />}/>
              } />
              <Route
                path="/products/:productId/edit"
                element={
                  <ProtectedRoute element= {<CreateProductForm />}/>
                }
              />
              <Route
                path="/products/:productId/detail"
                element={
                  <ProtectedRoute element= {<ProductDetailPage />}/>
                }
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
