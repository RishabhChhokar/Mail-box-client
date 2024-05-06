import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Compose from "./components/Mail/Compose";
import SentBox from "./components/Mail/SentBox";
import Inbox from "./components/Mail/Inbox";
import ForgetPassword from "./pages/ForgetPassword";
const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/send" element={<Compose />} />
            <Route path="/sentbox" element={<SentBox />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};
export default App;
