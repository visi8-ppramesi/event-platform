const functions = require("firebase-functions");
const { getServices } = require('../utils/services.js')

exports.userOnCreateListener = functions.firestore.document('/users/{documentId}').onCreate((snap, context) => {
    const { db } = getServices(['db'])
    const data = snap.data()
})

exports.userOnEditListener = functions.firestore.document('/users/{documentId}').onUpdate((snap, context) => {
    const { db } = getServices(['db'])
    const data = snap.data()
})

exports.userOnDeleteListener = functions.firestore.document('/users/{documentId}').onDelete((snap, context) => {
    const { db } = getServices(['db'])
    const data = snap.data()
    //delete images too
})

exports.userAuthOnDeleteListener = functions.auth.user().onDelete(async (user) => {
    const { db } = getServices(['db'])
    await db.collection('users').doc(user.uid).delete()
    //delete images and user firestore document
});

// exports.userAuthOnDeleteListener = functions.auth.user().onCreate((user) => {

// });