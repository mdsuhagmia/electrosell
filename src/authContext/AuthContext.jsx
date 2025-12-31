// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
// import { createContext, useContext, useEffect, useState } from "react"
// import app from "../firebase.config"

// const AuthContext = createContext()

// export const useAuth = () => useContext(AuthContext)

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const auth = getAuth(app)

//   // sign up using email and password
//   const signUpWithEmail = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   // login using email and password
//   const loginWithEmail = (email, password)=>{
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   // sign in with google 
//   const googleLogin = ()=>{
//     const googleProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleProvider)
//   }

//   // manage user state
//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//       setLoading(false)
//     });
//     return unSubscribe
//   }, [auth])

//   // logout funtionality
//   const logout = ()=>{
//     signOut(auth)
//   }

//   const value = { 
//     user, 
//     signUpWithEmail, 
//     loginWithEmail,
//     googleLogin,
//     logout,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider
