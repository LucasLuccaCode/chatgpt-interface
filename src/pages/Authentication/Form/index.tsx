import { Navigate } from "react-router-dom";
import { FormEvent } from "react";

import { FormStyled, Input } from "./styles";
import { Button } from "../styles";

import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";

interface FormProps {
  isLogin: boolean;
}

export const Form: React.FC<FormProps> = ({ isLogin }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, signIn } = useAuth()

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    signIn({ email, password })
  }


  if (user) {
    return <Navigate to="/chatbot" />
  }

  return (
    <FormStyled onSubmit={handleForm}>
      {!isLogin && (
        <Input
          type="text"
          name="username"
          value={name}
          placeholder="Nome"
          required
          onChange={e => setName(e.target.value)}
        />
      )}
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        required
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Senha"
        required pattern=".{6,12}"
        title="Senha precisa ter entre 6 e 12 caracteres"
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">
        {isLogin ? 'Logar' : 'Cadastrar'}
      </Button>
    </FormStyled>
  )
}