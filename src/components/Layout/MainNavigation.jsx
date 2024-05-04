import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuth } from "../../store/auth-slice";

const MainNavigation = () => {
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(resetAuth());
    navigate("/auth");
  };

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MailBox Client
        </Link>
        <div>
          <ul className="navbar-nav ml-auto">
            {!isLogged && (
              <li style={{ height: "40px" }}>
                <Link className="btn btn-primary" to="/auth">
                  Login
                </Link>
              </li>
            )}
            {isLogged && (
              <li style={{ display: "flex", alignItems: "center" }}>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
                <Link className="btn btn-primary" to="/send">
                  Compose Mail
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
