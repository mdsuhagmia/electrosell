import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useState } from "react"
import app from "../firebase.config"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const auth = getAuth(app)

  // sign up using email and password
  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // login using email and password
  const loginWithEmail = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const value = { user, signUpWithEmail, loginWithEmail }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
