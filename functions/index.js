const {db}=require('./util/util.admin') // DataBase
const functions = require("firebase-functions");
const app = require("express")(); // эти две строки с низу это и есть эта строка только в сокращенной форме
// const express = require("express");
// const app = express();
const FBAuth=require('./util/util.fbAuth')

const {getScream,postOneScream,getAllScreams,commentOnScream,likeScream,unlikeScream,deleteScream} = require('./handlers/handlers.screams')
const {signup,login,uploadImage,addUserDetails,getAuthenticatedUser}=require('./handlers/handlers.users')


// Scream routes
app.get("/screams", getAllScreams);    //GET ALL SCREAMS
app.post("/scream",FBAuth, postOneScream); //POST ONE
app.get('/scream/:screamId',getScream)   //GET ONE
app.delete('/scream/:screamId',FBAuth,deleteScream) //DELETE
app.get('/scream/:screamId/like',FBAuth,likeScream);     //LIKE
app.get('/scream/:screamId/unlike',FBAuth,unlikeScream); // UNLIKE
app.post("/scream/:screamId/comment",FBAuth,commentOnScream) //COMMENT ONE

//users routes
app.post("/signup", signup); //SIGN UP
app.post('/login',login); //LOGIN
app.post('/user/image',FBAuth,uploadImage) //UPLOAD
app.post('/user',FBAuth,addUserDetails) //USER Details
app.get('/user',FBAuth,getAuthenticatedUser) //AUTH
//

//Signup route
//TODO validate data

exports.api = functions.region("europe-west1").https.onRequest(app); // Это строка делает наш запрос читаемым, так как в случае app.get(/screams) нам необходим формат
// app.get(baseurl/api/screams) <--- то есть наш /api не добавляется и эта строка исправляет это.

exports.deleteNotificationOnUnLike=functions.region("europe-west1").firestore.document(`likes/{id}`)
    .onDelete((snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return
            })
            .catch(err => {
                console.error(err)
                return
            })
    }))

exports.createNotificationOnLike=functions.region('europe-west1').firestore.document(`likes/{id}`)
    .onCreate((snapshot) =>{
            db.doc(`/screams/${snapshot.data().screamId}`).get()
                .then(doc =>{
                    if(doc.exists){
                        return db.doc(`notifications/${snapshot.id}`).set({
                            createdAt:new Date().toISOString(),
                            recipient:doc.data().userHandle,
                            sender:snapshot.data().userHandle,
                            type:'like',
                            read:false,
                            screamId:doc.id
                        })
                    }
                })
                .then(()=>{
                    return
                })
                .catch((err)=>{
                    console.error(err)
                    return
                })
})
exports.createNotificationOnComment=functions.region('europe-west1').firestore.document(`comments/{id}`)
    .onCreate((snapshot) =>{
        db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc =>{
                if(doc.exists){
                    return db.doc(`notifications/${snapshot.id}`).set({
                        createdAt:new Date().toISOString(),
                        recipient:doc.data().userHandle,
                        sender:snapshot.data().userHandle,
                        type:'comment',
                        read:false,
                        screamId:doc.id
                    })
                }
            })
            .then(()=>{
                return
            })
            .catch((err)=>{
                console.error(err)
                return
            })
    })
exports.deleteNotificationOnComment=functions.region('europe-west1').firestore.document(`comments/{id}`)
.onDelete(snapshot => {
    db.doc()
})