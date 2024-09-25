import styles from "./Login.module.css"; 
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import PageNav from "../../components/PageNav/PageNav"

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("Yasmin@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);  // Trigger login
      console.log(`${email}, ${password}`);
    }
  }

  // Redirect if authenticated after login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);  // Listen for authentication status

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}