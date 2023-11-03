import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { ID } from "appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailSession(email, password);
    sessionStorage.setItem('user',JSON.stringify(loggedIn));
    setUser(JSON.parse(sessionStorage.getItem('user')));
    console.log(JSON.parse(sessionStorage.getItem('user')));
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    window.location.reload();
  }

  async function register(email, password) {
    await account.create(ID.unique(),email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      console.log(loggedIn);
      setUser(loggedIn);
    } catch (err) {
      console.log("error in account.get");
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
