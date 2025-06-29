import React, {createContext, useContext, useState} from 'react'


const AuthContext = createContext<any>({});


const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [token, setToken] = useState<any>(undefined);
  return (
    <AuthContext.Provider value={{
        token, 
        setToken
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;


export const useAuthContext = () =>{
    return useContext(AuthContext)
}