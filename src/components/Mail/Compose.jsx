import { useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { useCompose } from "../../customHooks/MailHooks/use-compose"; 

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const emailRef = useRef(null);
  const subRef = useRef(null);
  const senderEmail = useSelector((state) => state.auth.userEmail);
  const { sendEmail, isLoading, error } = useCompose();

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const handleSendEmail = async () => {
    if (
      !emailRef.current.value ||
      !subRef.current.value ||
      editorState.getCurrentContent().hasText() === false
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (emailRef.current.value === senderEmail) {
      alert("You can't send mail to yourself");
      return;
    }
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const email = {
      to: emailRef.current.value,
      subject: subRef.current.value,
      body: JSON.stringify(rawContent),
      sender: senderEmail,
      read: false,
      date: new Date().getTime(),
    };

    await sendEmail(email);
    emailRef.current.value = "";
    subRef.current.value = "";
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="compose-email">
      <input
        className="email-input"
        type="email"
        placeholder="To"
        ref={emailRef}
      />
      <input
        className="email-input"
        type="text"
        placeholder="Subject"
        ref={subRef}
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
      />
      <button
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "2px solid black",
          borderRadius: "50px",
        }}
        className="send-button"
        onClick={handleSendEmail}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
      {error && <div>Error: {error.message}</div>}
      <style>{`
        .compose-email {
          display: flex;
          flex-direction: column;
          margin: 20px;
        }
        .email-input {
          margin-bottom: 0px;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 200px;
        }
        .toolbar-class {
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f3f3f3;
          margin-bottom: 10px;
        }
        .wrapper-class {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .editor-class {
          min-height: 150px;
          padding: 10px;
        }
        .send-button {
          padding: 5px 10px;
          margin-top: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100px;
        }
        .send-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Compose;
