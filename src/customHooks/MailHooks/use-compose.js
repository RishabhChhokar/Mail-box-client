import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const useCompose = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, email.sender + "_sentEmails"), email);
      await addDoc(collection(db, email.to + "_receivedEmails"), email);
      console.log("Email sent successfully!");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};
