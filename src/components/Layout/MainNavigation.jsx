import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuth, updateUnreadEmails } from "../../store/auth-slice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const MainNavigation = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  const unreadEmails = useSelector((state) => state.auth.unreadEmails);

  useEffect(() => {
    const fetchUnreadEmails = async () => {
      if (!isLogged || !userEmail) return;

      const q = query(
        collection(db, userEmail + "_receivedEmails"),
        where("to", "==", userEmail),
        where("read", "==", false), 
      );
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size;
      dispatch(updateUnreadEmails(count));
    };

    fetchUnreadEmails();
  }, [isLogged, userEmail, dispatch]);

  const logoutHandler = () => {
    dispatch(resetAuth());
    navigate("/auth");
  };

  return (
    <nav
      // style={{
      //   backgroundImage: `url("/Images/email headers.jpg")`,
      // }}
      className="navbar bg-light"
    >
      <div className="container-fluid">
        <Link
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "1.1rem",
            color: "white",
            margin: "1px",
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
                    fontSize: "2.12rem",
                    textDecoration: "none",
                  }}
                  to="/inbox"
                  type="button"
                  className=" position-relative"
                >
                  📧
                  {unreadEmails > 0 && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        top: "2px",
                        right: "-5px",
                      }}
                      className="position-absolute badge rounded-pill bg-danger"
                    >
                      {unreadEmails}
                    </span>
                  )}
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