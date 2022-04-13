const functions = require("firebase-functions");
const { getServices } = require('../utils/services.js')

exports.eventOnCreateListener = functions.firestore.document('/events/{documentId}').onCreate((snap, context) => {
    const { db } = getServices(['db'])
    const data = snap.data()
})

exports.eventOnEditListener = functions.firestore.document('/events/{documentId}').onUpdate((snap, context) => {
    const data = snap.data()
})

exports.eventOnDeleteListener = functions.firestore.document('/events/{documentId}').onDelete((snap, context) => {
    const data = snap.data()
    //delete images too
})

exports.toggleSubscribeEvent = functions.https.onCall(async (data, context) => {
    const { event: eventId } = data
    if(!context.auth){
        return false
    }
    const { db, FieldValue } = getServices(['db', 'FieldValue'])

    const uid = context.auth.uid
    const userRef = db.collection('user').doc(uid)
    const eventRef = db.collection('events').doc(eventId)
    const pivotRef = db.collection('users_events_subscribers').where('event', '==', eventId)

    return db.runTransaction(t => {
        return t.getAll(userRef, eventRef)
            .then((docs) => {
                const userData = docs[0].data()
                const { cover_picture, name } = docs[1].data()

                const followingObj = userData.following.filter((fol) => {
                    return fol.parent_id == eventId
                })
                if(followingObj.length > 0){
                    t.update(userRef, {following: FieldValue.arrayRemove(followingObj[0])})
                    t.update(eventRef, {subscribers: FieldValue.increment(-1)})
                    t.update(pivotRef, {users: FieldValue.arrayRemove(uid)})
                }else{
                    t.update(userRef, {following: FieldValue.arrayUnion({
                        parent_id: eventId,
                        parent_type: 'events',
                        data: {
                            cover_picture,
                            name
                        }
                    })})
                    t.update(eventRef, {subscribers: FieldValue.increment(1)})
                    t.update(pivotRef, {users: FieldValue.arrayUnion(uid)})
                }
            })
    })

    // const userData = (await userRef.get()).data()
    // const followingObj = userData.following.filter((fol) => {
    //     return fol.parent_id == eventId
    // })

    // const batch = db.batch()
    // if(followingObj.length > 0){
    //     batch.update(userRef, {following: FieldValue.arrayRemove(followingObj[0])})
    //     batch.update(eventRef, {subscribers: FieldValue.increment(-1)})
    //     batch.update(pivotRef, {users: FieldValue.arrayRemove(uid)})
    // }else{
    //     const { cover_picture, name } = (await eventRef.get()).data()

    //     batch.update(userRef, {following: FieldValue.arrayUnion({
    //         parent_id: eventId,
    //         parent_type: 'events',
    //         data: {
    //             cover_picture,
    //             name
    //         }
    //     })})
    //     batch.update(eventRef, {subscribers: FieldValue.increment(1)})
    //     batch.update(pivotRef, {users: FieldValue.arrayUnion(uid)})
    // }
    // return batch.commit()
    //toggle following
})