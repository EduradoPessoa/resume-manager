export const ASAAS_CONFIG = {
  API_KEY: process.env.ASAAS_API_KEY || '',
  SANDBOX: process.env.NODE_ENV !== 'production',
  WEBHOOK_TOKEN: process.env.ASAAS_WEBHOOK_TOKEN || '',
  SUBSCRIPTION_BILLING_TYPE: 'CREDIT_CARD', // ou 'BOLETO'
  SUBSCRIPTION_CYCLE: 'MONTHLY',
  SUBSCRIPTION_VALUE: 9.00, // R$ 9,00
  SUBSCRIPTION_DESCRIPTION: 'Plano Profissional Resume Manager',
  DISCOUNT_CONFIGS: {
    DEFAULT_DURATION: 3, // meses
    MAX_PERCENTAGE: 50, // 50% de desconto máximo
    MIN_PERCENTAGE: 10, // 10% de desconto mínimo
  }
}

export const getAsaasApiUrl = () => {
  return ASAAS_CONFIG.SANDBOX
    ? 'https://sandbox.asaas.com/api/v3'
    : 'https://www.asaas.com/api/v3'
}

export const formatSubscriptionValue = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const calculateDiscountedValue = (
  originalValue: number,
  discountPercentage: number
) => {
  const discount = (originalValue * discountPercentage) / 100
  return originalValue - discount
}

export const validateDiscountCode = (code: string) => {
  // TODO: Implementar validação do código de desconto
  // Esta função deverá verificar no banco de dados se o código existe
  // e se ainda está válido
  return {
    isValid: true,
    discountPercentage: 20,
    duration: 3
  }
}
