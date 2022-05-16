import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProfileContent = () => {
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {}) {
      navigate("/login");
    } else if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  return (
    <>Hello {userName}, please access the sidebar to continue registeration.</>
  );
};

const Profile = () => {
  return <Navbar child={<ProfileContent />} />;
};

export default Profile;
