import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const HomePage = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  let currentUser =  useSelector((state) => state.auth.userEmail)
  useEffect(() => {
    if (!isLogged) {
      navigate("/auth");
    }
  }, [isLogged]);

  if (!isLogged) {
    return null;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "1.5rem",
        color: "black",
        margin: "120px",
        padding: "5px",
        textAlign : "center",
        borderRadius: "50px",
        border : "3px solid black"
      }}
    >
      Welcome back to the mail box client app, {currentUser}.
    </div>
  );
};

export default HomePage;
