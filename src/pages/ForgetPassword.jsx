import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();

  const passwordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
        }
      );

      if (response.ok) {
        alert("Password reset link sent to your email");
        navigate("/auth");
      } else {
        throw new Error("Error while sending password reset link");
      }
    } catch (error) {
      console.log(error);
      alert("Enter valid Email");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
      className="container mt-3"
    >
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div
            style={{
              border: "1px solid black",
              boxShadow: "0 1.4px 4px rgba(0, 0, 0, 0.2)",
            }}
            className="card"
          >
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot Password</h2>
              <div className="form-group">
                <label htmlFor="email">Enter your Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  ref={emailInputRef}
                />
              </div>
              <button
                style={{
                  marginRight: "10px",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  border: "2px solid black",
                  borderRadius: "50px",
                }}
                className="btn btn-primary w-100 mt-2"
                onClick={passwordHandler}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
