import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./scss/global.scss";
const Users = React.lazy(() => import("./pages/Users"));
const ProductsBackend = React.lazy(
  () => import("./pages/products-admin/ProductsBackend")
);
const ProductForm = React.lazy(
  () => import("./pages/products-admin/ProductForm")
);
const Spinner = React.lazy(() => import("./components/Spinner"));
const ProductsFrontend = React.lazy(
  () => import("./pages/products-frontend/ProductsFrontend")
);
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <ProductsFrontend />
              </React.Suspense>
            }
          />
          <Route
            path={"/login"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path={"/register"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <Register />
              </React.Suspense>
            }
          />
          <Route
            path={"/profile"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              </React.Suspense>
            }
          />
          <Route
            path={"/admin/users"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              </React.Suspense>
            }
          />
          <Route
            path={"/admin/products"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <ProductsBackend />
                </PrivateRoute>
              </React.Suspense>
            }
          />
          <Route
            path={"admin/products/create"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              </React.Suspense>
            }
          />
          <Route
            path={"admin/products/:id/edit"}
            element={
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
