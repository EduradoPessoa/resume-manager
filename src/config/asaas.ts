interface AsaasConfig {
  apiKey: string;
  baseUrl: string;
}

const config: AsaasConfig = {
  apiKey: import.meta.env.VITE_ASAAS_API_KEY || '',
  baseUrl: import.meta.env.VITE_ASAAS_BASE_URL || 'https://sandbox.asaas.com/api/v3'
};

interface AsaasError {
  message: string;
  details?: string[];
}

interface AsaasResponse<T> {
  data?: T;
  error?: AsaasError;
}

export const createCustomer = async (name: string, email: string): Promise<AsaasResponse<any>> => {
  try {
    const response = await fetch(`${config.baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': config.apiKey
      },
      body: JSON.stringify({
        name,
        email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message || 'Failed to create customer',
          details: data.errors?.map((err: any) => err.description)
        }
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        message: 'Failed to create customer',
        details: [(error as Error).message]
      }
    };
  }
};

export const createSubscription = async (customerId: string, value: number): Promise<AsaasResponse<any>> => {
  try {
    const response = await fetch(`${config.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': config.apiKey
      },
      body: JSON.stringify({
        customer: customerId,
        value,
        nextDueDate: new Date().toISOString().split('T')[0],
        cycle: 'MONTHLY',
        description: 'Premium Subscription'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message || 'Failed to create subscription',
          details: data.errors?.map((err: any) => err.description)
        }
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        message: 'Failed to create subscription',
        details: [(error as Error).message]
      }
    };
  }
};
