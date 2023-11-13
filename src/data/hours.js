import {db} from "./init.js"
import { collection, getDocs } from "firebase/firestore";

let hours = [];

const hoursSnapshot = await getDocs(collection(db, "hours"));

hoursSnapshot.forEach((doc) => {
	hours[doc.id] = doc.data()
});

export { hours }