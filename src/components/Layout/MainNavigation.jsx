import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoggedStatus } from "../../store/auth-slice";
const MainNavigation = () => {
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.auth.isLogged);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLoggedStatus(false));
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
              <li style={{height : "40px"}}>
                <Link className="btn btn-primary" to="/auth">
                  Login
                </Link>
              </li>
            )}
            {isLogged && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
