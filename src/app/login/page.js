'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('MF_USER_TOKEN')
    if (token) {
      router.push('/admin')
    }
  }, [router])

  const handleLogin = (e) => {
    e.preventDefault()

    // login fake para apresentação
    const tokenFake = 'token-apresentacao'
    const nomeUsuario = 'Caio'

    localStorage.setItem('MF_USER_TOKEN', tokenFake)
    localStorage.setItem('MF_USER_NOME', nomeUsuario)

    router.push('/admin')
  }

  return (
    <>
      <button id="toggleTheme" className="btn btn-outline-secondary theme-toggle">
        <i className="lni lni-sun"></i>
      </button>

      <div className="login-card">
        <h3 className="mb-4 text-center">
          <i className="lni lni-lock-alt me-2"></i>
          Portal Administrativo
        </h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" id="entrar" className="btn btn-primary w-100">
            <i className="lni lni-enter me-2"></i>
            Entrar
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="small">Esqueceu a senha?</a>
        </div>
      </div>
    </>
  )
}