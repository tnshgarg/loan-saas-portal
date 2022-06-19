import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const handleSubmitLogin = () => {
    navigate("/login");
  };

  const handleSubmitSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <h1>Welcome to Unipe</h1>
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
