import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileContent = () => {
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {}) {
      navigate("auth/login", { replace: true });
    } else if (!auth.isLoggedIn) {
      navigate("auth/login", { replace: true });
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  return (
    <div>
      <h5 style={{ textAlign: "center" }}>
        Hello {userName}, please access the sidebar to continue registeration.
      </h5>
    </div>
  );
};

const Overview = () => {
  return <ProfileContent />;
};

export default Overview;
