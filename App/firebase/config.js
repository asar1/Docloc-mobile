// import Firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyAW8bwPUeV7a6CYNT00Hwa7-rvzd22qxSE",
//     projectId: "e-health-general",
//     databaseURL: "https://e-health-general-default-rtdb.firebaseio.com/",
//     appId: "1:459288554232:android:90a738812cdbaf6908a90d",
// }

// export const senderMsg = async (msgValue, currentUserId, guestUserId, img, date) => {
//     try {
//         return await firebase
//             .database()
//             .ref('messeges/' + currentUserId)
//             .child(guestUserId)
//             .push({
//                 messege: {
//                     sender: currentUserId,
//                     reciever: guestUserId,
//                     msg: msgValue,
//                     img: img,
//                     dateEntered: date.toString()
//                 },
//             });
//     } catch (error) {
//         return error;
//     }
// };

// export const recieverMsg = async (
//     msgValue,
//     currentUserId,
//     guestUserId,
//     img,
//     date
// ) => {
//     try {
//         return await firebase
//             .database()
//             .ref('messeges/' + guestUserId)
//             .child(currentUserId)
//             .push({
//                 messege: {
//                     sender: currentUserId,
//                     reciever: guestUserId,
//                     msg: msgValue,
//                     img: img,
//                     dateEntered: date.toString()
//                 },
//             });
//     } catch (error) {
//         return error;
//     }
// };

// export const firebase = Firebase.initializeApp(firebaseConfig);