import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { convertFromRaw } from "draft-js";
import { updateUnreadEmails } from "../../store/auth-slice";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToInboxChanges();

    return () => {
      unsubscribe();
    };
  }, [userEmail]);

  const listenToInboxChanges = () => {
    const q = query(
      collection(db, userEmail + "_receivedEmails"),
      where("to", "==", userEmail)
    );

    return onSnapshot(q, (snapshot) => {
      const newEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmails(newEmails);


      const unreadCount = newEmails.filter((email) => !email.read).length;
      dispatch(updateUnreadEmails(unreadCount));
    });
  };

  const markAsRead = async (id) => {
    const emailRef = doc(db, userEmail + "_receivedEmails", id);
    await updateDoc(emailRef, { read: true });
  };

  const deleteEmail = async (id) => {
    const emailRef = doc(db, userEmail + "_receivedEmails", id);
    await deleteDoc(emailRef);
  };

  return (
    <ListGroup>
      {emails
        .sort((a, b) => b.date - a.date)
        .map((email) => {
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
                <strong>Received on:</strong>{" "}
                {new Date(email.date).toLocaleString()}
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
              <button
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "13px",
                  padding: "3px",
                  ...(email.read ? {} : { marginLeft: "10px" }),
                }}
                className="btn btn-outline-danger me-2"
                onClick={() => deleteEmail(email.id)}
              >
                🗑️
              </button>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default Inbox;
