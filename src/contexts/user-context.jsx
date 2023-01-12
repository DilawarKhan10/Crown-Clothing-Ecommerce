import {createContext, useState, useEffect} from 'react';
import { 
    onAuthStateChangedListener, 
    createUserDocumentFromAuth  
} from '../routes/utils/firebase/firebase';

export const UserContext = createContext({
    setCurrentUser : () => null,
    currentUser : null,
});

export  const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser};

    useEffect(() =>{
       const unsbscribe = onAuthStateChangedListener((user) =>{
        if (user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
       });

       return unsbscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};