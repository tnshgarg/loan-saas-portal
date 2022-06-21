import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const handleSubmitLogin = () => {
    navigate("/login");
  };

  const handleSubmitSignUp = () => {
    navigate("/sign-up");
  };

  const HEADLINE = {
    textAlign: "center",
  };

  return (
    <>
      <h1 style={HEADLINE}>Welcome to Unipe</h1>
      <br />
      <form onSubmit={handleSubmitLogin}>
        <input type="submit" value="Login" />
      </form>
      <form onSubmit={handleSubmitSignUp}>
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
};
