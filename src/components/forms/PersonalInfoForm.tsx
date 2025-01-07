import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { PersonalInfo } from '../../types/resume'

interface PersonalInfoFormProps {
  data: PersonalInfo
  onUpdate: (data: PersonalInfo) => void
}

const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<PersonalInfo>({
    defaultValues: data,
  })

  // Observar mudanças nos campos para atualizar em tempo real
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as PersonalInfo)
    })
    return () => subscription.unsubscribe()
  }, [watch, onUpdate])

  useEffect(() => {
    reset(data)
  }, [data, reset])

  const onSubmit = (formData: PersonalInfo) => {
    onUpdate(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
      <div className="grid grid-cols-1 gap-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <div className="mt-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="name"
                  className={`shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                  placeholder="Ex: João Silva"
                />
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className={`shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  placeholder="Ex: joao@email.com"
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <div className="mt-1">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^\(\d{2}\) \d{5}-\d{4}$/,
                  message: 'Formato: (99) 99999-9999',
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  id="phone"
                  className={`shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.phone ? 'border-red-300' : ''
                  }`}
                  placeholder="Ex: (11) 99999-9999"
                />
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Localização */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Localização
          </label>
          <div className="mt-1">
            <Controller
              name="location"
              control={control}
              rules={{ required: 'Localização é obrigatória' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="location"
                  className={`shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.location ? 'border-red-300' : ''
                  }`}
                  placeholder="Ex: São Paulo, SP"
                />
              )}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <div className="mt-1">
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="url"
                  id="linkedin"
                  className="shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Ex: https://linkedin.com/in/seu-perfil"
                />
              )}
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
            Portfolio / Website
          </label>
          <div className="mt-1">
            <Controller
              name="portfolio"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="url"
                  id="portfolio"
                  className="shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Ex: https://seu-portfolio.com"
                />
              )}
            />
          </div>
        </div>

        {/* Sobre */}
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            Sobre
          </label>
          <div className="mt-1">
            <Controller
              name="about"
              control={control}
              rules={{
                required: 'Uma breve descrição é obrigatória',
                minLength: {
                  value: 100,
                  message: 'Descreva-se em pelo menos 100 caracteres',
                },
              }}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="about"
                  rows={4}
                  className={`shadow-sm focus:ring-navy focus:border-navy block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.about ? 'border-red-300' : ''
                  }`}
                  placeholder="Descreva sua experiência, objetivos e habilidades principais..."
                />
              )}
            />
            {errors.about && (
              <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Escreva um breve resumo sobre você, sua experiência e objetivos profissionais.
          </p>
        </div>
      </div>
    </form>
  )
}

export default PersonalInfoForm
