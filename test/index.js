import dotenv from 'dotenv'
const env = dotenv.config().parsed

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc, setDoc, addDoc, getFirestore, collection } from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// console.log(firebaseConfig)
const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID,
    measurementId: env.MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

(async function(){
    const docRef = doc(db, "artists", "41YwHrm92e6l9zpGR3uG");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.docs)
    // const cred = await createUserWithEmailAndPassword(auth, 'test2@test.com', 'password')
    //     .then((resp) => {
    //         return setDoc(doc(db, 'users', resp.user.uid), {
    //             email: resp.user.email,
    //             test: 'test'
    //         })
    //     })
    //     .then((resp) => {
    //         return resp
    //     })
    //     .catch((err) => {
    //         return err
    //     })
    // // const currentUser = await auth.currentUser.getIdToken()
    // console.log(cred)
})();