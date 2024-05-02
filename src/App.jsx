import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {useSelector} from "react-redux"
import AuthForm from "./pages/AuthForm";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
const App = () => {
  const isLogged = useSelector((state) => state.auth.isLogged)
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            {!isLogged && <Route path="/auth" element={<AuthForm />} />}
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};
export default App;
