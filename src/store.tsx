import React, { useEffect, useState } from "react";
import firebase, { auth } from "./fireConfig";
import User from "./interfaces/User";

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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) setCurrentUser(null);
      else
        setCurrentUser({
          displayName: user.displayName ? user.displayName : "NO NAME",
          email: user.email ? user.email : "NO EMAIL",
          emailVerified: user.emailVerified,
          uid: user.uid,
        });
    });
  }, []);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};

export default Store;
