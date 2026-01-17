import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./components/root/RootLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";
import Process from "./pages/Process";
import WishList from "./pages/WishList";
import OrderComplete from "./pages/OrderComplete";
import ForgotPass from "./pages/ForgotPass";
import MyAccount from "./pages/MyAccount";
import FAQs from "./pages/FAQs";
import ShippingDelivery from "./pages/ShippingDelivery";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ActivatePage from "./pages/ActivatePage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardHome from "./components/dashboard/DashboardHome";
import ResetPassword from "./components/dashboard/ResetPassword";
import UpdatePassword from "./components/dashboard/UpdatePassword";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import MyOrders from "./components/dashboard/MyOrders";

const routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/api/user/activate/:token" element={<ActivatePage />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/shippingdelivery" element={<ShippingDelivery />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />

        <Route
          path="/process"
          element={
            <PrivateRoute>
              <Process />
            </PrivateRoute>
          }
        />

        <Route
          path="/ordercomplete"
          element={
            <PrivateRoute>
              <OrderComplete />
            </PrivateRoute>
          }
        />

        <Route
          path="/myaccount"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome/>}></Route>
          <Route path="/dashboard/my-order" element={<MyOrders/>}></Route>
          <Route path="/dashboard/profile" element={<Profile/>}></Route>
          <Route path="/dashboard/settings" element={<Settings/>}></Route>
          <Route path="/dashboard/updatepassword" element={<UpdatePassword/>}></Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routing} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;