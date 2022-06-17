import { useNavigate } from "react-router-dom";

export const InvalidRoute = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <>
      <h1>404 Error</h1>
      <h1>Page not found</h1>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Return to Main Page" />
      </form>
    </>
  );
};
