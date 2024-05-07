import { useDispatch } from "react-redux";
import {
  setLoading,
  setError,
  setLoggedStatus,
  setUser,
} from "../store/auth-slice";
import { auth } from "../firebase/firebaseConfig.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";

const useSignUp = () => {
  const dispatch = useDispatch();

  const signup = async (email, password, navigate) => {
    dispatch(setLoading(true));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setLoggedStatus(true));
      dispatch(setUser(userCredential.user));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    }

    dispatch(setLoading(false));
  };

  return { signup };
};

export default useSignUp;
