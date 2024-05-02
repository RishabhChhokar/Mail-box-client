import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth");
    }
  }, [isLogged]);

  if (!isLogged) {
    return null;
  }

  return <div>Welcome to the app.</div>;
};

export default HomePage;
