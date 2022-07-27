const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
    // get user and add custom claim({admin: true})
    return admin.auth().getUserByEmail(data.email)
    .then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    })
    .then(()=>{
        return {
            message: `수정되었습니다. ${data.email} 어드민으로 지정되었습니다`
        }
    }).catch(error => {
        return error
    })
})

exports.deleteAdminRole = functions.https.onCall((data, context)=>{
    // get user and add custom claim({admin: true})
    return admin.auth().getUserByEmail(data.email)
    .then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: false
        })
    })
    .then(()=>{
        return {
            message: `수정되었습니다. ${data.email} 어드민이 해제 되었습니다`
        }
    }).catch(error => {
        return error
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
