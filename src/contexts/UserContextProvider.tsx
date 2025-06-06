import { createContext, useState, type ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

type UserContext = {
  user: null | User;
  token: null | string;
  message: { text: string; state: boolean; success: boolean };
  setMessage: (message: string, success: boolean) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
};
export const UserContext = createContext<UserContext>({
  user: null,
  token: null,
  message: { text: "", success: false, state: false },
  setMessage: () => {},
  setUser: () => {},
  setToken: () => {},
});

type UserContextProviderProps = {
  children: ReactNode;
};
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, _setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(
    window.localStorage.getItem("ACCESS_TOKEN") || null
  );
  const [message, _setMessage] = useState({
    text: "",
    state: false,
    success: false,
  });
  const setUser = (user: User) => {
    _setUser({ ...user });
  };

  const setMessage = (msg: string, sucss: boolean) => {
    _setMessage({ text: msg, success: sucss, state: true });
    const handler = window.setTimeout(() => {
      _setMessage({ text: "", state: false, success: false });
      clearTimeout(handler);
    }, 2500);
  };
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      window.localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      window.localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, message, setMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};
