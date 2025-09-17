import { createContext, useEffect, useState, useContext} from 'react'
import { supabase } from '../SupabaseClient'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    
    //sign up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email, 
            password: password
        })

        if(error) {
            console.error("There was a problem signing up", error)
            return { success: false, error }
        }
        return{ success: true, data }
    }
 

    //sign in
    const signInUser = async (email, password) => {
        try {

            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if(error) {
                console.log("sign in error: ", error)
                return { success: false, error: error.message }
            }

            console.log("sign in sucess", data)
            return { success: true, data }

        } catch(error) {
            console.log("An error happend: ", error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    
    //sign out
    const signOut = () => {
        const { error } = supabase.auth.signOut()
        if(error) {
            console.log("There was an error ", error)
        }
    }
 
    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOut, signInUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}