

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { logout } from "../utils/context/reducers/authSlice";

function Protect({ children }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state: any) => state.auth.user?.user);
  const token = useSelector((state: any) => state.auth.user?.user?.accessToken);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      navigate("/notAuthorized");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
        navigate("/login");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(logout());
      navigate("/login");
      setLoading(false);
    }
  }, [user, token, navigate, dispatch]);

//   if (loading) return <div>Loading....</div>

  return user ? children : null;
}

export default Protect;
