 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import {getAnalytics,
    ref,
         push,
         onValue,
         remove 
  } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-default-rtdb.europe-west1.firebasedatabase.app/"
}
const firebaseConfig = {
  apiKey: "AIzaSyCNv-XOehSDf8OPtl2UpbBVnzN76frFRb4",
  authDomain: "leads-tracker-app-44d59.firebaseapp.com",
  projectId: "leads-tracker-app-44d59",
  storageBucket: "leads-tracker-app-44d59.firebasestorage.app",
  messagingSenderId: "487274490195",
  appId: "1:487274490195:web:305e7ddb4af507eea459a6",
  measurementId: "G-3Q36PFPEYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const referenceInDB = ref(analytics, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})
