import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { convertFromRaw } from "draft-js";
import { useDispatch } from "react-redux";
import { updateUnreadEmails } from "../../store/auth-slice";
const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEmails = async () => {
      const q = query(
        collection(db, userEmail + "_receivedEmails"),
        where("to", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      setEmails(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchEmails();
  }, [userEmail]);

  const markAsRead = async (id) => {
    const emailRef = doc(db, userEmail + "_receivedEmails", id);
    await updateDoc(emailRef, { read: true });
    const q = query(
      collection(db, userEmail + "_receivedEmails"),
      where("to", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    setEmails(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const unreadCount = querySnapshot.docs.filter(
      (doc) => !doc.data().read
    ).length;
    dispatch(updateUnreadEmails(unreadCount));
  };

  return (
    <ListGroup>
      {emails.map((email) => {
        const contentState = convertFromRaw(JSON.parse(email.body));

        const text = contentState.getPlainText();

        return (
          <ListGroup.Item key={email.id}>
            <p>
              <strong>From:</strong> {email.sender}
            </p>
            <p>
              <strong>Subject:</strong> {email.subject}
            </p>
            <p>
              <strong>Body:</strong> {text}
            </p>
            <p>
              <strong>Read:</strong> {email.read ? "Yes" : "No"}
            </p>
            {!email.read && (
              <button
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "13px",
                  border: "2px solid black",
                  borderRadius: "50px",
                  padding: "3px",
                }}
                className="btn btn-secondary"
                onClick={() => markAsRead(email.id)}
              >
                Mark as Read
              </button>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Inbox;
