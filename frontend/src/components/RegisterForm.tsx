import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { AxiosError } from 'axios';

export default function RegisterForm() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
  
    try {
      await registerUser({
        nome: name,
        email: email,
        senha: password
      })
      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        console.error(error.response.data);
        alert('Erro ao registrar: ' + (error.response.data as AxiosError).message)
      } else {
        console.error(error);
        alert('Erro desconhecido ao registrar')
      }
    }
  }
  

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Nome</label><br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Senha</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmPassword">Confirmar Senha</label><br />
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
