import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { convertFromRaw } from "draft-js";

const SentBox = () => {
  const [emails, setEmails] = useState([]);
  const senderEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    const fetchEmails = async () => {
      const q = query(
        collection(db, senderEmail + "_sentEmails"),
        where("sender", "==", senderEmail)
      );
      const querySnapshot = await getDocs(q);
      setEmails(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchEmails();
  }, [senderEmail]);

  const deleteEmail = async (id) => {
    const emailRef = doc(db, senderEmail + "_sentEmails", id);
    await deleteDoc(emailRef);
    refreshEmails();
  };

  const refreshEmails = async () => {
    const q = query(
      collection(db, senderEmail + "_sentEmails"),
      where("sender", "==", senderEmail)
    );
    const querySnapshot = await getDocs(q);
    setEmails(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                <strong>To:</strong> {email.to}
              </p>
              <p>
                <strong>Sent on:</strong>{" "}
                {new Date(email.date).toLocaleString()}
              </p>
              <p>
                <strong>Subject:</strong> {email.subject}
              </p>
              <p>
                <strong>Body:</strong> {text}
              </p>
              <button
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "13px",
                  padding: "3px",
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

export default SentBox;
