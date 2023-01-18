import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABE6pd5o54a24MMm3p-j6glsnbUJqMIWA",

  authDomain: "projetcrustace.firebaseapp.com",

  databaseURL:
    "https://projetcrustace-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "projetcrustace",

  storageBucket: "projetcrustace.appspot.com",

  messagingSenderId: "1028460500593",

  appId: "1:1028460500593:web:9b5409cbb341c42ac0add0",

  measurementId: "G-Q83FLLCB9Q",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let items = ref(database, "items");

export async function getData() {
  return get(items)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let tmp = snapshot.val();
        return tmp;
      } else {
        return "No data available";
      }
    })
    .finally((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
