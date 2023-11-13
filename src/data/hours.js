import {db} from "./init.js"
import { collection, getDocs } from "firebase/firestore";

async function retrieveHours(){
	let hours = [];

	const hoursSnapshot = await getDocs(collection(db, "hours"));

	hoursSnapshot.forEach((doc) => {
		hours[doc.id] = doc.data()
	});

	return hours
}

export { retrieveHours }