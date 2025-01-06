import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Language as LanguageIcon,
} from '@mui/icons-material'
import type { PersonalInfo } from '../../types/resume'

interface PersonalInfoFormProps {
  data: PersonalInfo
  onUpdate: (data: PersonalInfo) => void
}

const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const { control, handleSubmit, reset } = useForm<PersonalInfo>({
    defaultValues: data,
  })

  useEffect(() => {
    console.log('PersonalInfoForm - Dados recebidos:', data)
    reset(data)
  }, [data, reset])

  const onSubmit = (formData: PersonalInfo) => {
    console.log('PersonalInfoForm - Dados atualizados:', formData)
    onUpdate(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
      <Typography variant="h6" className="text-gray-700 mb-4">
        Informações Pessoais
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome Completo"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Telefone é obrigatório' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Telefone"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="location"
            control={control}
            rules={{ required: 'Localização é obrigatória' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Localização"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="LinkedIn"
                placeholder="https://linkedin.com/in/seu-perfil"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="portfolio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Portfolio"
                placeholder="https://seu-portfolio.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Sobre você"
                placeholder="Breve descrição sobre você e seus objetivos profissionais"
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default PersonalInfoForm
