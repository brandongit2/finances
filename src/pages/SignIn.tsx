import firebase from "firebase/app";
import {useState} from "react";
import {Redirect} from "react-router-dom";
import {useAuth} from "reactfire";

import styles from "./SignIn.module.css";
import {Input, Layout} from "../components";
import store from "../redux/store";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  async function signIn(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  if (store.getState().userInfo.isSignedIn) return <Redirect to="/" />;
  return (
    <Layout className={styles.container}>
      <form className={styles.form} onSubmit={signIn}>
        <label>Email:</label>
        <Input
          type="text"
          autoComplete="email"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />

        <label>Password:</label>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <button style={{gridColumn: "1 / 3"}}>Sign in</button>
      </form>
    </Layout>
  );
}
