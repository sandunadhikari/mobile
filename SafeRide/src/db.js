import Firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBKTRxRurksjl6ynjbGuCN-labGObJjtI0",
    authDomain: "saferide-5bf6f.firebaseapp.com",
    databaseURL: "https://saferide-5bf6f.firebaseio.com",
    projectId: "saferide-5bf6f",
    storageBucket: "",
    messagingSenderId: "90942214329",
    appId: "1:90942214329:web:c9fdc5d27bf56759"
};
let db=Firebase.initializeApp(firebaseConfig);
export default db;
