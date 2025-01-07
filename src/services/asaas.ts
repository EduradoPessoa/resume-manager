import { ASAAS_CONFIG, getAsaasApiUrl } from '../config/asaas'

interface CreateCustomerParams {
  name: string
  email: string
  cpfCnpj?: string
  phone?: string
}

interface CreateSubscriptionParams {
  customerId: string
  value: number
  nextDueDate: string
  billingType: 'CREDIT_CARD' | 'BOLETO'
  creditCard?: {
    holderName: string
    number: string
    expiryMonth: string
    expiryYear: string
    ccv: string
  }
  discount?: {
    value: number
    dueDateLimitDays: number
  }
}

export const createCustomer = async (params: CreateCustomerParams) => {
  try {
    const response = await fetch(`${getAsaasApiUrl()}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_CONFIG.API_KEY
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      throw new Error('Erro ao criar cliente no Asaas')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    throw error
  }
}

export const createSubscription = async (params: CreateSubscriptionParams) => {
  try {
    const response = await fetch(`${getAsaasApiUrl()}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_CONFIG.API_KEY
      },
      body: JSON.stringify({
        ...params,
        cycle: ASAAS_CONFIG.SUBSCRIPTION_CYCLE,
        description: ASAAS_CONFIG.SUBSCRIPTION_DESCRIPTION
      })
    })

    if (!response.ok) {
      throw new Error('Erro ao criar assinatura no Asaas')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    throw error
  }
}

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await fetch(`${getAsaasApiUrl()}/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_CONFIG.API_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Erro ao cancelar assinatura no Asaas')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error)
    throw error
  }
}

export const getSubscriptionStatus = async (subscriptionId: string) => {
  try {
    const response = await fetch(`${getAsaasApiUrl()}/subscriptions/${subscriptionId}`, {
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_CONFIG.API_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Erro ao obter status da assinatura no Asaas')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao obter status da assinatura:', error)
    throw error
  }
}

export const processWebhook = async (token: string, payload: any) => {
  // Validar token do webhook
  if (token !== ASAAS_CONFIG.WEBHOOK_TOKEN) {
    throw new Error('Token inválido')
  }

  try {
    // Processar diferentes eventos do webhook
    switch (payload.event) {
      case 'PAYMENT_RECEIVED':
        // Atualizar status do usuário para premium
        break
      case 'PAYMENT_OVERDUE':
        // Notificar usuário sobre pagamento atrasado
        break
      case 'SUBSCRIPTION_CANCELED':
        // Remover status premium do usuário
        break
      default:
        console.log('Evento não processado:', payload.event)
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    throw error
  }
}
