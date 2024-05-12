import { useInbox } from "../../customHooks/MailHooks/use-inbox";
import { ListGroup, Button } from "react-bootstrap";
import { convertFromRaw } from "draft-js";
import "./Mail.css";

const Inbox = () => {
  const { emails, markAsRead, deleteEmail } = useInbox();
  return (
    <div className="inbox-container">
      <ListGroup
        className="email-list"
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        {[...emails]
          .sort((a, b) => b.date - a.date)
          .map((email) => {
            const contentState = convertFromRaw(JSON.parse(email.body));
            const text = contentState.getPlainText();

            return (
              <ListGroup.Item key={email.id} className="email-item">
                <div className="email-header">
                  <p className="email-sender">
                    <strong>From:</strong> {email.sender}
                  </p>

                  <p className="email-date">
                    <strong>Received on:</strong>{" "}
                    {new Date(email.date).toLocaleString()}
                  </p>
                </div>
                <div className="email-body">
                  <p>
                    <strong>Subject:</strong> {email.subject}
                  </p>
                  <p className="email-text">
                    <strong>Body:</strong> {text}
                  </p>
                  <p className="email-read">
                    <strong>Read:</strong> {email.read ? "Yes" : "No"}
                  </p>
                </div>
                <div className="email-actions">
                  {!email.read && (
                    <Button
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
                    </Button>
                  )}
                  <Button
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
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default Inbox;
