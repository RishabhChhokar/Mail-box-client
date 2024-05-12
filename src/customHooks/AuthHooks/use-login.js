import { useDispatch } from "react-redux";
import {
  setLoading,
  setError,
  setLoggedStatus,
  setUser,
} from "../../store/auth-slice.jsx";
import { auth } from "../../firebase/firebaseConfig.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";

const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (email, password, navigate) => {
    dispatch(setLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setLoggedStatus(true));
      dispatch(setUser(userCredential.user, userCredential.accessToken));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    }

    dispatch(setLoading(false));
  };

  return { login };
};

export default useLogin;
