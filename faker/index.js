import dotenv from 'dotenv'

const env = dotenv.config().parsed
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { faker } from '@faker-js/faker';
// import { firebaseConfig } from "./config/index.js";
import { doc, addDoc, getFirestore, collection, getDocs, query, where, setDoc, getDoc } from "firebase/firestore"; 
import generator from "./generator.js";
import minimist from 'minimist'
import { toggleSubscribeEvent, toggleFollowArtist } from './functions/index.js';

const argv = minimist(process.argv.slice(2))
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID,
    measurementId: env.MEASUREMENT_ID
}

// Initialize Firebase
// console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const data = generator()
const collections = Object.keys(data)

if(argv.seed){
    const prom = []
    collections.map((collName) => {
        data[collName].map((document) => {
           const docRef = collection(db, collName);
           prom.push(addDoc(docRef, document));
        });
    });

    (async () => {
        await Promise.allSettled(prom);
        const artistsRef = collection(db, 'artists')
        const eventsRef = collection(db, 'events')

        // const usersArtistsPivot = collection(db, 'users_artist_followings')
        // const usersEventsPivot = collection(db, 'users_events_subscribers')

        const artistsSnap = await getDocs(artistsRef)
        const eventsSnap = await getDocs(eventsRef)

        artistsSnap.forEach(async (myDoc) => {
            console.log(myDoc.id)
            await setDoc(doc(db, 'users_artist_followings', myDoc.id), {users: []})
        })

        eventsSnap.forEach(async (myDoc) => {
            console.log(myDoc.id)
            await setDoc(doc(db, 'users_events_subscribers', myDoc.id), {users: []})
        })
    })();
}

// 0pc2G0a0Y4dEHCizTiG0

// 0NrKZNtL4sE57xL8Jifq
// NHDPinWYqwSTb2WedBIE

if(argv.testlikes){
    const usersColl = collection(db, 'users');
    const evsColl = collection(db, 'events');
    (async () => {
        const users = await getDocs(usersColl)
        const evs = await getDocs(evsColl)

        const uKeys = Object.keys(users.docs)
        const eKeys = Object.keys(evs.docs)
        for(let j = 0; j < eKeys.length; j++){
            const eKey = eKeys[j]
            for(let i = 0; i < uKeys.length; i++){
                const uKey = uKeys[i]
                const hrstart = process.hrtime()
                await toggleSubscribeEvent(db, users.docs[uKey].id, evs.docs[eKey].id)
                const hrend = process.hrtime(hrstart)
                console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            }
        }
    })();
}

if(argv.testfollows){
    const usersColl = collection(db, 'users');
    const artistsColl = collection(db, 'artists');
    (async () => {
        const users = await getDocs(usersColl)
        const evs = await getDocs(artistsColl)

        const uKeys = Object.keys(users.docs)
        const eKeys = Object.keys(evs.docs)
        for(let j = 0; j < eKeys.length; j++){
            const eKey = eKeys[j]
            for(let i = 0; i < uKeys.length; i++){
                const uKey = uKeys[i]
                const hrstart = process.hrtime()
                await toggleFollowArtist(db, users.docs[uKey].id, evs.docs[eKey].id)
                const hrend = process.hrtime(hrstart)
                console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            }
        }
    })();

}

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