import {Switch} from "./";
import styles from "./Footer.module.css";
import {userInfo} from "../redux/actions";
import store from "../redux/store";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>Made by Brandon Tsang.</p>
      <Switch
        leftLabel="light"
        rightLabel="dark"
        onUpdate={(newState) => {
          const newTheme = newState === "left" ? "light" : "dark";
          store.dispatch(userInfo.changeTheme(newTheme));
        }}
      />
    </div>
  );
}
