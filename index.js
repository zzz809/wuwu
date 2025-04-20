// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, set, update, runTransaction } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJgdCFkiVdz-eD7-f5TWfA4QDv42jOguk",
  authDomain: "data-a7e8f.firebaseapp.com",
  databaseURL: "https://data-a7e8f-default-rtdb.firebaseio.com",
  projectId: "data-a7e8f",
  storageBucket: "data-a7e8f.firebasestorage.app",
  messagingSenderId: "876657837650",
  appId: "1:876657837650:web:468c8421c5ceb31f76818b",
  measurementId: "G-5RWLFMRRVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Reference to the 'views' node in the Realtime Database
const viewsRef = ref(database, 'views');

// Get current view count from Firebase and update it
get(viewsRef).then((snapshot) => {
  if (snapshot.exists()) {
    // If 'views' exists in the database, retrieve and display it
    const viewCount = snapshot.val();
    document.getElementById('view-count').innerText = viewCount;
  } else {
    // If no 'views' data, initialize it to 0
    document.getElementById('view-count').innerText = 0;
  }
});

// Increment the view count
function incrementViewCount() {
  runTransaction(viewsRef, (currentViews) => {
    return (currentViews || 0) + 1;
  }).then((result) => {
    console.log('View count updated', result);
  }).catch((error) => {
    console.error('Error updating view count:', error);
  });
}

// Increment view count every time the page is loaded
incrementViewCount();
