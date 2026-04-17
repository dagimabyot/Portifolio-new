import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const stored = localStorage.getItem('admin_authenticated')
    const timestamp = localStorage.getItem('admin_auth_timestamp')

    // Session expires after 24 hours
    if (stored === 'true' && timestamp) {
      const authTime = parseInt(timestamp, 10)
      const now = Date.now()
      const dayInMs = 24 * 60 * 60 * 1000

      if (now - authTime < dayInMs) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_auth_timestamp')
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Verify password (in production, this should be done server-side)
      const correctPassword = 'Dagimabyot123$'

      if (password === correctPassword) {
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_auth_timestamp', Date.now().toString())
        setIsAuthenticated(true)
        return true
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_auth_timestamp')
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
