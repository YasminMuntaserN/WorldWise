import { useAuth } from "../../contexts/FakeAuthContext";
import Message from "../Message/Message";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";


function User() {
  const navigate = useNavigate(); 
  const {user ,logout ,isAuthenticated} =useAuth();

  function handleClick() {
    logout();
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect them to the login page
      navigate("/Login");
    }
  }

  if(!user) return <Message message="No User defined 🤨"/>

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
