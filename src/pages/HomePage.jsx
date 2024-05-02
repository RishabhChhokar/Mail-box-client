import { useSelector } from "react-redux";
const HomePage = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  return !isLogged ? (
    <div>Welcome to mail client app. Please log in to continue.</div>
  ) : <div>Welcome to the the app.</div>;
};
export default HomePage;
