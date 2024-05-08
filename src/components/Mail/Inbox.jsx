import {useInbox} from "../../customHooks/MailHooks/useInbox"
import { ListGroup } from "react-bootstrap";
import { convertFromRaw } from "draft-js";

const Inbox = () => {
  const { emails, markAsRead, deleteEmail } = useInbox();

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
