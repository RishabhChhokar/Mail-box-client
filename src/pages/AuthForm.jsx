import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { setUser, setLoading, setError, clearError, setLoggedStatus } from "../store/auth-slice";
import { auth } from "../firebase/firebaseConfig.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const navigate =  useNavigate()
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const error = useSelector((state) => state.auth.error);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    dispatch(clearError());
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const enteredPassword2 = confirmPasswordInputRef.current.value;
      if (
        enteredEmail &&
        enteredPassword &&
        enteredPassword2 &&
        enteredPassword === enteredPassword2
      ) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            enteredEmail,
            enteredPassword
          );
          dispatch(setLoggedStatus(true));
          dispatch(setUser(userCredential.user));
          navigate("/")
        } catch (error) {
          dispatch(setError(error.message));
        }
      } else if (enteredPassword !== enteredPassword2) {
        dispatch(setError("Passwords didn't match"));
        console.log("Passwords didn't match");
        return;
      } else {
        dispatch(setError("All Fields Are Required"));
        console.log("All Fields Are Required");
        return;
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          enteredEmail,
          enteredPassword
        );
        dispatch(setUser(userCredential.user));
        dispatch(setLoggedStatus(true));
        navigate("/");
      } catch (error) {
        dispatch(setError(error.message));
      }
    }

    dispatch(setLoading(false));
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        style={{
          boxShadow: "0 1.4px 4px rgba(0, 0, 0, 0.2)",
          padding: "10px 10px",
          borderRadius: "8px",
        }}
      >
        {error && <p style={{ color: "red", textAlign: "start" }}>*{error}</p>}
        <h1 style={{ color: "blue", textAlign: "center" }}>
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              required
              ref={emailInputRef}
            />
          </div>
          <div className="mb-3">
            {isLogin && (
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  required
                  ref={passwordInputRef}
                />
              </div>
            )}
            {!isLogin && (
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  required
                  ref={passwordInputRef}
                />
                <label htmlFor="password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  required
                  ref={confirmPasswordInputRef}
                />
              </div>
            )}
          </div>
          <div>
            {!isLoading && (
              <button className="btn btn-primary me-2">
                {isLogin ? "Login" : "Create Account"}
              </button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
