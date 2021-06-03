import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { User } from "./services/userManagement/interfaces";
import { userManagement } from "./services";

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
    userManagement.onCurrentUserChanged((user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }

      setCurrentUser(user);

      if (!user.emailVerified) history.push("/verify");
    });
  }, []);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};

export default Store;
