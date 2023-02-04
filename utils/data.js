import { db } from "@/firebase";
import complaints from "@/pages/complaints";
import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore"

export const getUser = async (userRef) => {
    // console.log(userRef);
    const docRef = doc(db, ...userRef);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const { name, type } = data;
        const id = docSnap.id;
        return { id, name, type };
    }
    return { error: "User Not Found" };
}
export const getComplaint = async (id) => {
    // console.log(userRef);
    const docRef = doc(db, 'complaints', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const id = docSnap.id;
        return { id, ...data };
    }
    return { error: "Complaint Not Found" };
}

export const getComplaints = async (type, thana) => {
    const collectionRef = collection(db, 'complaints');
    const q = type === "admin" ? query(collectionRef) : query(collectionRef, where("thana", "==", thana));
    const complaints = [];
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() });
        })
    });
    return complaints;
}
export const getAllComplaints = async () => {
    const collectionRef = collection(db, 'complaints');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const complaints = [];
    querySnapshot.forEach((doc) => {
        complaints.push({ id: doc.id, ...doc.data() });
    })
    return complaints;
}

export const addComplaint = async (data) => {
    const collectionRef = collection(db, 'complaints');
    try {
        const res = await addDoc(collectionRef, { ...data });
        return { id: res.id }
    } catch (err) {
        return err;
    }
}

export const updateComplaint = async (id, data) => {
    const docRef = doc(db, 'complaints', id);
    try {
        await setDoc(docRef, { ...data }, { merge: true });
        return { status: 'success' };
    }
    catch (err) {
        return err;
    }
}

export const deleteComplaint = async (id) => {
    try {
        deleteDoc(doc(db, 'complaints', id));
        return { status: "Deleted Successfully" }
    } catch (err) {
        return { status: "Can't Delete", error: err }
    }
}
