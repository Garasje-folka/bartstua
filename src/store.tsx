import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "./fireConfig";
import User from "./interfaces/User";
import userConverter from "./services/firebaseHelpers/userConverter";

const initalState = {
  currentUser: undefined,
  setCurrentUser: () => {},
};

interface ContextType {
  currentUser: User | undefined | null;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<User | undefined | null> | User | undefined | null
  >;
}
export const Context = React.createContext<ContextType>(initalState);

interface StoreProps {
  children: any;
}

const Store = (props: StoreProps) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | undefined | null>();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) setCurrentUser(null);
      //else if (!user.email) auth.signOut();
      else {
        const finalUser = userConverter(user);
        setCurrentUser(finalUser);
      }
      if (user && !user.emailVerified) history.push("/verify");
    });
  }, []);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};

export default Store;
