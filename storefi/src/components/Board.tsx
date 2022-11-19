import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , Firestore, QuerySnapshot } from "firebase/firestore";

interface Address {
    address: string
}

const firebaseConfig = {
  apiKey: "AIzaSyC_pLy1L2OwUXXnkiV9ejDoXvc-CgYyN9M",
  authDomain: "storefi.firebaseapp.com",
  projectId: "storefi",
  storageBucket: "storefi.appspot.com",
  messagingSenderId: "203827032373",
  appId: "1:203827032373:web:726017c96dbdbc6f4e9c7c",
  measurementId: "G-5NEW7LBEKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function fetchAddresses() {
    const addressesSnapshot = await getDocs(collection(db, 'addresses'))
    console.log("there are " + addressesSnapshot.size + " addresses at the moment");
}

const Board =  () => {
    fetchAddresses();
    return (
        <div>
        </div>
    );
}

export default Board;
