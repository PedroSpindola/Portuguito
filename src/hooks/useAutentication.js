import React, { useState, useEffect } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export function useAuthentication() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    
    return unsubscribeFromAuthStateChanged;
  }, []);
  

  return user;
}