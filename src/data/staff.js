import {db} from "./init.js"
import { collection, getDocs } from "firebase/firestore";

async function retrieveStaff() {
	let staff = [];

	const staffSnapshot = await getDocs(collection(db, "staff"));

	staffSnapshot.forEach((doc) => {
		staff[doc.id] = doc.data()
	});

	return staff
}

export { retrieveStaff }