import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuth } from "../../store/auth-slice";
import UnreadEmails from "../Mail/UnreadEmails";

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
        <Link
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "1.5rem",
            color: "white",
            margin: "0",
            padding: "5px",
            border: "2px solid black",
            borderRadius: "50px",
            background: "darkblue",
          }}
          className="navbar-brand"
          to="/"
        >
          MailBox Client
        </Link>
        <div>
          <ul className="navbar-nav ml-auto">
            {!isLogged && (
              <li
                style={{
                  height: "40px",
                }}
              >
                <Link
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                  className="btn btn-primary"
                  to="/auth"
                >
                  Login
                </Link>
              </li>
            )}
            {isLogged && (
              <li style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                  className="btn btn-outline-danger me-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
                <Link
                  style={{
                    marginRight: "10px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                  className="btn btn-primary"
                  to="/send"
                >
                  Compose Mail
                </Link>
                <Link
                  style={{
                    marginRight: "10px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                  to="/inbox"
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  Inbox
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <UnreadEmails />
                  </span>
                </Link>
                <Link
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                  className="btn btn-primary"
                  to="/sentbox"
                >
                  Sentbox
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
