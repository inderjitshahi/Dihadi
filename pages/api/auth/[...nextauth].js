import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { db, firebaseConfig } from '../../../firebase'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        name: { label: "Name", type: "text", placeholder: "eg: deepak" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { name, password } = credentials;
        const docRef = query(collection(db, 'users'), where('name', '==', name));
        const docSnap = await getDocs(docRef);
        let session = null;
        docSnap.forEach(doc => {
          const user = doc.data();
          if(user.password===password) session = {
            name: doc.id,
          };
        })
        return session;
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

