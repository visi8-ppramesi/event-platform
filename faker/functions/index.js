import { doc, runTransaction, arrayRemove, arrayUnion, increment } from "firebase/firestore";

export const toggleSubscribeEvent = async (db, uid, eventId) => {
    const uidRef = doc(db, 'users/' + uid)
    // const userRef = collection('users').doc(uid)
    // const eventRef = collection('events').doc(eventId)
    const eventIdRef = doc(db, 'events/' + eventId)
    // const pivotRef = query(collection(db, 'users_events_subscribers'), where('event', '==', eventIdRef))
    const pivotRef = doc(db, 'users_events_subscribers/' + eventId)

    try {
        const rt = runTransaction(db, async (t) => {
            // const docs = await t.getAll(uidRef, eventIdRef, pivotRef);

            const uDoc = t.get(uidRef)
            const eDoc = t.get(eventIdRef)
            const pDoc = t.get(pivotRef)

            const docs = await Promise.all([uDoc, eDoc, pDoc])

            docs.forEach((doc) => {
                if (!doc.exists()) {
                    throw "Document does not exist!";
                }
            })

            const userData = docs[0].data()
            const { cover_picture, name } = docs[1].data()

            const followingObj = userData.following.filter((fol) => {
                return fol.parent.id == eventId && fol.parent_type == 'events'
            })
            if(followingObj.length > 0){
                t.update(uidRef, {following: arrayRemove(followingObj[0])})
                t.update(eventIdRef, {subscribers: increment(-1)})
                t.update(pivotRef, {users: arrayRemove(uidRef)})
            }else{
                t.update(uidRef, {following: arrayUnion({
                    parent: eventIdRef,
                    parent_type: 'events',
                    data: {
                        cover_picture,
                        name
                    }
                })})
                t.update(eventIdRef, {subscribers: increment(1)})
                t.update(pivotRef, {users: arrayUnion(uidRef)})
            }
        });
        return rt
    } catch (e) {
        // This will be a "population is too big" error.
        console.error(e);
    }
}

export const toggleFollowArtist = async (db, uid, artistId) => {
    const uidRef = doc(db, 'users/' + uid)
    // const userRef = collection('users').doc(uid)
    // const eventRef = collection('events').doc(eventId)
    const artistIdRef = doc(db, 'artists/' + artistId)
    // const pivotRef = query(collection(db, 'users_artists_subscribers'), where('artist', '==', artistIdRef))
    const pivotRef = doc(db, 'users_artist_followings/' + artistId)

    try {
        const rt = runTransaction(db, async (t) => {
            // const docs = await t.getAll(uidRef, artistIdRef, pivotRef);

            const uDoc = t.get(uidRef)
            const eDoc = t.get(artistIdRef)
            const pDoc = t.get(pivotRef)

            const docs = await Promise.all([uDoc, eDoc, pDoc])

            docs.forEach((doc) => {
                if (!doc.exists()) {
                    throw "Document does not exist!";
                }
            })

            const userData = docs[0].data()
            const { profile_picture, name } = docs[1].data()

            const followingObj = userData.following.filter((fol) => {
                return fol.parent.id == artistId && fol.parent_type == 'artists'
            })
            if(followingObj.length > 0){
                t.update(uidRef, {following: arrayRemove(followingObj[0])})
                t.update(artistIdRef, {fans: increment(-1)})
                t.update(pivotRef, {users: arrayRemove(uidRef)})
            }else{
                t.update(uidRef, {following: arrayUnion({
                    parent: artistIdRef,
                    parent_type: 'artists',
                    data: {
                        profile_picture,
                        name
                    }
                })})
                t.update(artistIdRef, {fans: increment(1)})
                t.update(pivotRef, {users: arrayUnion(uidRef)})
            }
        });
        return rt
    } catch (e) {
        // This will be a "population is too big" error.
        console.error(e);
    }

}