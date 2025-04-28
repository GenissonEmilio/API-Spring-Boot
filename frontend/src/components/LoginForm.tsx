import { useState } from "react"
import { loginUser } from "../services/auth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await loginUser({ email, senha })
      localStorage.setItem('token', response.data.token)
      alert('Login realizado com sucesso!')
      window.location.href = '/dashboard'
    } catch (error) {
      console.error(error)
      alert('Erro ao fazer login')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br/>
      <button type="submit">Entra</button>
    </form>
  )
}
