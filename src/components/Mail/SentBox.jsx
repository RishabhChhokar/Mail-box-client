import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  return (
    <ListGroup>
      {emails.map((email) => {
        const contentState = convertFromRaw(JSON.parse(email.body));
        const text = contentState.getPlainText();

        return (
          <ListGroup.Item key={email.id}>
            <p>
              <strong>To:</strong> {email.to}
            </p>
            <p>
              <strong>Subject:</strong> {email.subject}
            </p>
            <p>
              <strong>Body:</strong> {text}
            </p>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default SentBox;
