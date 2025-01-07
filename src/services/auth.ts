interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // TODO: Integrar com backend
  // Por enquanto, vamos simular um login básico
  const mockUsers = [
    {
      id: '1',
      name: 'Henrique Zimm',
      email: 'hzimm@phoenyx.com.br',
      password: '123456',
      isPremium: false
    }
  ]

  const user = mockUsers.find(u => u.email === email)
  if (!user || user.password !== password) {
    throw new Error('Email ou senha inválidos')
  }

  const { password: _, ...userWithoutPassword } = user
  const token = btoa(JSON.stringify(userWithoutPassword)) // Não usar em produção!

  // Salvar token no localStorage
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(userWithoutPassword))

  return {
    user: userWithoutPassword,
    token
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    const user = JSON.parse(userStr)
    return user
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error)
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const user = getCurrentUser()
  const token = localStorage.getItem('token')
  return !!(user && token)
}

export const register = async (name: string, email: string, password: string): Promise<LoginResponse> => {
  // TODO: Integrar com backend
  // Por enquanto, vamos simular um registro
  const user = {
    id: Date.now().toString(),
    name,
    email,
    isPremium: false
  }

  const token = btoa(JSON.stringify(user)) // Não usar em produção!

  // Salvar token no localStorage
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))

  return {
    user,
    token
  }
}
