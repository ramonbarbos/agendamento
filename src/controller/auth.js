import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [usuario, setUsuario] = useState([]);
  const navigation = useNavigation();

  async function logar(id, login, senha) {
    if (login !== "" && senha !== "") {
      try {
        const response = await fetch(`http://10.0.0.120/apiRest/usuarios/listar/${id}`);
        const data = await response.json();

        if (response.ok) {
          const formUsuario = data.resposta;
            setUsuario(formUsuario)
         
            setUser({
              id: usuario.id,
              login: usuario.login,
              senha: usuario.senha,
              nome: usuario.nome,
              foto: usuario.foto,
              cidade: usuario.cidade,
              funcionario_id: usuario.funcionario_id,
              cargo: usuario.cargo,
              ativo: usuario.ativo,
            });
            navigation.navigate("Main");
         
        } else {
          console.log("Request failed:", response.status);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ nome: "Ramon Barbosa", logar, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
