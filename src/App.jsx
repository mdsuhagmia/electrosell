import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./components/root/RootLayout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import NotFound from "./pages/NotFound"
import Blog from "./pages/Blog"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProductDetails from "./components/ProductDetails"
import Cart from "./pages/Cart"
import { ToastContainer } from "react-toastify"
import Process from "./pages/Process"
import WishList from "./pages/WishList"
import OrderComplete from "./pages/OrderComplete"
import ForgotPass from "./pages/ForgotPass"
import MyAccount from "./pages/MyAccount"
import FAQs from "./pages/FAQs"
import ShippingDelivery from "./pages/ShippingDelivery"
import Categories from "./pages/Categories"
import { Toaster } from "react-hot-toast"
import Dashboard from "./components/Dashboard"

let routing = createBrowserRouter(createRoutesFromElements(
  <>
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/products/:id" element={<ProductDetails/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/process" element={<Process/>}></Route>
      <Route path="/ordercomplete" element={<OrderComplete/>}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/aboutus" element={<AboutUs />}></Route>
      <Route path="/wishlist" element={<WishList/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/forgotpass" element={<ForgotPass />}></Route>
      <Route path="/myaccount" element={<MyAccount />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/faqs" element={<FAQs />}></Route>
      <Route path="/shippingdelivery" element={<ShippingDelivery />}></Route>
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </>
))

function App() {
  
  return (
    <div>
      <RouterProvider router={routing}></RouterProvider>
      <ToastContainer
        autoClose={1000}
      />
      <Toaster
        position="top-center"
        autoClose={3000}
      />
    </div>
  )
}

export default App
