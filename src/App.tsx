import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useUser} from "reactfire";

import "./App.css";
import {Loading} from "./components";
import {userInfo} from "./redux/actions";
import store from "./redux/store";
import {Home, SignIn} from "./pages";

export default function App() {
  const {status, data} = useUser();

  if (status === "success") {
    if (data)
      store.dispatch(
        userInfo.signIn({
          uid: data.uid,
          email: data.email,
        })
      );
  }

  if (status === "loading") return <Loading />;
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
