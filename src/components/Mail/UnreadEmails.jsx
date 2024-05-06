import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {updateUnreadEmails} from "../../store/auth-slice"
const UnreadEmails = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const unreadEmails = useSelector((state) => state.auth.unreadEmails);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUnreadEmails = async () => {
      const q = query(
        collection(db, userEmail + "_receivedEmails"),
        where("to", "==", userEmail),
        where("read", "==", false)
      );
      const querySnapshot = await getDocs(q);
      dispatch(updateUnreadEmails(querySnapshot.size));
    };

    fetchUnreadEmails();
  }, [userEmail, dispatch]);

  return (
      <
      >
        {unreadEmails}
      </>
  );
};

export default UnreadEmails;
