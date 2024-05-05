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
    <div>
      <h2
        style={{
          marginRight: "10px",
          marginBottom : "0px",
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "2px solid black",
          borderRadius: "50px",
        }}
        className="btn btn-primary"
      >
        Unread Emails: {unreadEmails}
      </h2>
    </div>
  );
};

export default UnreadEmails;
