const functions = require("firebase-functions");
const { getServices } = require('../utils/services.js')

exports.artistOnEditListener = functions.firestore.document('/artists/{documentId}').onUpdate((snap, context) => {
    const data = snap.data()
})

exports.artistOnDeleteListener = functions.firestore.document('/artists/{documentId}').onDelete((snap, context) => {
    const data = snap.data()
    //delete images too
})

exports.toggleFollowingArtist = functions.https.onCall((data, context) => {
    const { artist: artistId } = data
    if(!context.auth){
        return false
    }
    const { db, FieldValue } = getServices(['db', 'FieldValue'])

    const uid = context.auth.uid
    const userRef = db.collection('user').doc(uid)
    const artistRef = db.collection('artists').doc(artistId)
    const pivotRef = db.collection('users_artist_followings').where('artist', '==', artistId)

    return db.runTransaction(t => {
        return t.getAll(userRef, artistRef)
            .then((docs) => {
                const userData = docs[0].data()
                const { profile_picture, name } = docs[1].data()

                const followingObj = userData.following.filter((fol) => {
                    return fol.parent_id == artistId
                })
                if(followingObj.length > 0){
                    t.update(userRef, {following: FieldValue.arrayRemove(followingObj[0])})
                    t.update(artistRef, {subscribers: FieldValue.increment(-1)})
                    t.update(pivotRef, {users: FieldValue.arrayRemove(uid)})
                }else{
                    t.update(userRef, {following: FieldValue.arrayUnion({
                        parent_id: artistId,
                        parent_type: 'artists',
                        data: {
                            profile_picture,
                            name
                        }
                    })})
                    t.update(artistRef, {subscribers: FieldValue.increment(1)})
                    t.update(pivotRef, {users: FieldValue.arrayUnion(uid)})
                }
            })
    })
    //toggle following
})