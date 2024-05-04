import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Compose from "./components/Mail/Compose";
const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/" element={<HomePage/>} />
            <Route path="send" element={<Compose/>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};
export default App;
