const dotenv = require('dotenv').config().parsed
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { faker } from '@faker-js/faker';
// import { firebaseConfig } from "./config/index.js";
import { doc, addDoc, getFirestore, collection } from "firebase/firestore"; 
import generator from "./generator.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: dotenv.API_KEY,
    authDomain: dotenv.AUTH_DOMAIN,
    projectId: dotenv.PROJECT_ID,
    storageBucket: dotenv.STORAGE_BUCKET,
    messagingSenderId: dotenv.MESSAGING_SENDER_ID,
    appId: dotenv.APP_ID,
    measurementId: dotenv.MEASUREMENT_ID
}

// Initialize Firebase
// console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const data = generator()
const collections = Object.keys(data)

collections.map((collName) => {
    data[collName].map((document) => {
       const docRef = collection(db, collName)
       addDoc(docRef, document)
    })
})

// buildCreateFunctions(){
//     Object.keys(this.collections).forEach((collectionName) => {
//         const createFunctionName = 'create'
//         const createFunction = async function(data){
//             const docRef = collection(this.db, collectionName)
//             const procData = Object.keys(this.collectionConfig[collectionName]).reduce((acc, field) => {
//                 if(data[field] !== undefined && data[field] !== null){
//                     acc[field] = data[field]
//                 }
//                 return acc
//             }, {})
//             return new Promise((resolve, reject) => {
//                 addDoc(docRef, procData).then((docRef) => {
//                     resolve(docRef.id)
//                 })
//                 .catch(reject)
//             })
//         }.bind(this)
//         FirestoreOrm.definePropertyFunction(createFunctionName, this.collections[collectionName].functions, createFunction)
//         FirestoreOrm.definePropertyFunction(createFunctionName, this[collectionName].functions, createFunction)
//     })
// }