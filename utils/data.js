import { db } from "@/firebase";
import complaints from "@/pages/workers";
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
export const getUserByID = async (id) => {
    // console.log(userRef);
    const docRef = doc(db, 'users',id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const id = docSnap.id;
        return { id,...data};
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

export const getWorkers = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where("type", "==", "worker"));
    const complaints = [];
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() });
        })
    });
    return complaints;
}
export const getAllUsers = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const complaints = [];
    querySnapshot.forEach((doc) => {
        complaints.push({ id: doc.id, ...doc.data() });
    })
    return complaints;
}

export const addUser = async (data) => {
    const { name } = data;
    const collectionRef = collection(db, 'users');
    try {
        await addDoc(collectionRef,{ ...data },{name});
        return { status: "success" }
    } catch (err) {
        return {status:"error",error:err}
    }
}

export const updateUser = async (id, data) => {
    const docRef = doc(db, 'users', id);
    try {
        const res=await setDoc(docRef, { ...data });
        return { status: 'success',id:res?.id};
    }
    catch (err) {
        return {status:"error",error:err};
    }
}

export const deleteUser = async (id) => {
    try {
        deleteDoc(doc(db, 'users', id));
        return { status: "success" }
    } catch (err) {
        return { status: "error", error: err }
    }
}
