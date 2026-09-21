import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, User } from '../db/db';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  users: User[];
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  users: [],
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    db.users.toArray().then(loadedUsers => {
      setUsers(loadedUsers);
      if (loadedUsers.length > 0) {
        // Cargar el último usuario guardado en localStorage o el primero por defecto
        const savedId = localStorage.getItem('currentUserId');
        if (savedId) {
          const found = loadedUsers.find(u => u.id === Number(savedId));
          if (found) setCurrentUser(found);
          else setCurrentUser(loadedUsers[0]);
        } else {
          setCurrentUser(loadedUsers[0]);
        }
      }
    });
  }, []);

  const handleSetUser = (user: User) => {
    setCurrentUser(user);
    if (user.id) {
      localStorage.setItem('currentUserId', user.id.toString());
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser: handleSetUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
