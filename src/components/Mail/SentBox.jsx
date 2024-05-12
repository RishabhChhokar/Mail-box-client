import { ListGroup, Button } from "react-bootstrap";
import { convertFromRaw } from "draft-js";
import { useSentBox } from "../../customHooks/MailHooks/use-sentbox";
import "./Mail.css"
const SentBox = () => {
  const { emails, deleteEmail } = useSentBox();
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
                     <strong>To:</strong> {email.to}
                   </p>
                   <p className="email-date">
                     <strong>Sent on:</strong>{" "}
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
                 </div>
                 <div className="email-actions">
                   <Button
                     style={{
                       fontFamily: "Arial, Helvetica, sans-serif",
                       fontSize: "13px",
                       padding: "3px",
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

export default SentBox;
