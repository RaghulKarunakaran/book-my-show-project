
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/users";
import { useState } from "react";
import { message, Menu, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

function ProtectedRoute({children}) {
  // all the logic for validating the token 
  // redirection to login page
  const [userdata, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      key: "/",
    },
    {
      label: `${userdata? userdata.name : ""}`,
      icon: <UserOutlined />,
      key: "user",
      children: [
        {
          label: (
            <span
              onClick={() => {
                userdata.isAdmin ? navigate("/admin") : navigate("/profile")
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined/>,
          key: userdata?.isAdmin ? "/admin" : "/profile"
        },
        {
          label: (
            <Link to="/login" onClick={() => {
              localStorage.removeItem("token");
            }}>Logout</Link>
          ),
          icon: <LogoutOutlined />,
          key: "/login",
        }
      ]
    }
  ]

  const location = useLocation();

  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUserData(response.data);
      dispatch(setUser(response.data));   
    } catch(error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    console.log('ProtectedRoute gets triggered');
    if (localStorage.getItem('token')) {
      getValidUser();
    } else {
      navigate('/login');
    }
  }, [])

  return ( 
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Book My Show
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} selectedKeys={[location.pathname]} />

        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
      
    </>
  )
    
}
export default ProtectedRoute;
