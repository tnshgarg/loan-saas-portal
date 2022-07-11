import { useNavigate } from "react-router-dom";

export const Invalid = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/employer/register-form");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Coming soon ... </h1>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Return to Main Page" />
      </form>
    </div>
  );
};
