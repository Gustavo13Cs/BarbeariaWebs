"use client"

import { useContext, useState, type FormEvent } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import "./login.css"

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (!email || !password) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)
    await signIn({ email, password })
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7V12C2 17 6 21.5 12 22C18 21.5 22 17 22 12V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h1 className="logo-text">BarberPro</h1>
          </div>
          <p className="logo-subtitle">Faça login para agendar</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Sua senha secreta"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <div className="login-footer">
          <a href="#" className="footer-link">
            Não tem conta? Cadastre-se
          </a>
        </div>
      </div>
    </div>
  )
}
