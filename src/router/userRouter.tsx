import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../page/Landing1";
import LoginPage from "../page/Login";
import SignupPage from "../page/SignUp";
import OTPPage from "../page/otpPage";
import SuccessPage from "../page/success";
import Protect from "./protect";
import App from "../App";
import HomePage from "../page/Home";
import ErrorPage from "../page/Error";
import ResetSuccessPage from "../page/resetSuccess";
import ResetPasswordPage from "../page/resetingPage";
import ForgotPasswordPage from "../page/ResetEmail";
import OTPReset from "../page/otpReset";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>, 
  },
  {
    path: "/login",
    element: <LoginPage/>, 
  },
  {
    path: "/signup",
    element: <SignupPage/>, 
  },
  {
    path: "/otp",
    element: <OTPPage/>,
  },
  {
    path: "/success",
    element: <SuccessPage/>,
  },
  {
    path: "/reset",
    element: <ResetPasswordPage/>,
  },
  {
    path: "/resetSuccess",
    element: <ResetSuccessPage/>,
  },
  {
    path:'/resetemail',
    element:<ForgotPasswordPage/>
  },
  {
    path:'/otpreset',
    element:<OTPReset/>
  },
  {
    path: "/home",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true, 
        element: <HomePage/>,
      },
    ],
  },
]);

export default appRouter;
