// UserContext.js
import { getCookie } from 'cookies-next';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const token = getCookie('session');
    try {
      await fetch('http://localhost:5003/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
        .then((res) => {
          if(res.user){
            setUser(res.user)
            setLoading(false);
          } else {
              console.error('Failed to fetch user profile');
          }
        })
    } catch (error) {
      // Handle fetch errors if necessary
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('fetching user profile');
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
