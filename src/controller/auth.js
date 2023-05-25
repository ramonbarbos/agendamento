import React, {createContext, useState} from "react";

export const AuthContext = createContext({})

import { useNavigation } from "@react-navigation/native";


function AuthProvider({children}){

    const [user, setUser] = useState({});
    const navigation = useNavigation();

    function logar(id,login, senha){
        if(login !== '' && senha !== ''){

            
            setUser({
                id: id,
                login: login,
                status: "ONLINE"
            })

            

            navigation.navigate("Main");
        }
    }

    return(
        <AuthContext.Provider value={{nome: "Ramon Barbosa", logar, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;