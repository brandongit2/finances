import {useAuth} from "reactfire";

import {userInfo} from "../redux/actions";
import store from "../redux/store";

export function useSignOut() {
  const auth = useAuth();

  return () => {
    store.dispatch(userInfo.signOut());
    auth.signOut();
  };
}
