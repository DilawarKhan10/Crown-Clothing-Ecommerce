// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore, initializeFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMVLGZLhNV_Y5wA9RFJ3z14JuOWgn4QkQ",
  authDomain: "crwn-clothing-db-e00a0.firebaseapp.com",
  projectId: "crwn-clothing-db-e00a0",
  storageBucket: "crwn-clothing-db-e00a0.appspot.com",
  messagingSenderId: "287413959589",
  appId: "1:287413959589:web:95246f73781dbe2dae864c",
  measurementId: "G-1VSB8HY69G"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
initializeFirestore(firebaseapp, { experimentalForceLongPolling: true });

// const analytics = getAnalytics(app);

googleProvider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd,
    field
    ) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'Categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log ('error creating the user', error.message);
        }
    };
   
    return userDocRef;

   
}
export const createAuthUserWithEmailAndPassword = async ( email, password) =>{
    if (!email || !password) return;
      return await  createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async ( email, password) =>{
    if (!email || !password) return;
      return await  signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 

onAuthStateChanged(auth, callback)
