// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials";
// import { FirestoreAdapter } from "@next-auth/firebase-adapter"
// import { db, firebaseConfig } from '../../../firebase'
// import { collection, doc, getDoc, query, where } from "firebase/firestore";
// export default NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     CredentialsProvider({
//       type: 'credentials',
//       credentials: {
//         userID: { label: "UserID", type: "text", placeholder: "eg: deepak123" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         const { userID, password } = credentials;
//         const docRef = doc(db, 'users', userID);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const user = docSnap.data();
//           if (user.password !== password) return null;
//           return {
//             name: userID,
//             type: user?.type,
//           };
//         } else {
//           return null;
//         }
//       }
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// });

