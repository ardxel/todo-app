import { FC, ReactNode, createContext, useContext, useState } from 'react';

import { redirect } from 'react-router-dom';

interface IUserContext {
  isAuthorized: boolean;
  logout: () => void;
}

const UserContext = createContext<IUserContext>(null!);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const logout = () => {
    if (isAuthorized) {
      localStorage.removeItem('token');
      redirect('/');
      setIsAuthorized(false);
    }
  };

  return <UserContext.Provider value={{ isAuthorized, logout }}>{children}</UserContext.Provider>;
};

// context hook with user context
export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
