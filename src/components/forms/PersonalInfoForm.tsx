import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { PersonalInfo } from '../../types';

export interface PersonalInfoFormProps {
  initialData?: PersonalInfo;
  onSubmit: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ initialData, onSubmit }: PersonalInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonalInfo>({
    defaultValues: initialData || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      github: '',
      website: '',
      portfolio: '',
      about: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Informações Pessoais
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome Completo"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Nome completo é obrigatório' })}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefone"
            {...register('phone', {
              pattern: {
                value: /^[0-9\s\-\+\(\)]+$/,
                message: 'Telefone inválido'
              }
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Localização"
            {...register('location', { required: 'Localização é obrigatória' })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Resumo"
            multiline
            rows={4}
            {...register('summary', { required: 'Resumo é obrigatório' })}
            error={!!errors.summary}
            helperText={errors.summary?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sobre"
            multiline
            rows={4}
            {...register('about')}
            error={!!errors.about}
            helperText={errors.about?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn"
            {...register('linkedin')}
            error={!!errors.linkedin}
            helperText={errors.linkedin?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub"
            {...register('github')}
            error={!!errors.github}
            helperText={errors.github?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website"
            {...register('website')}
            error={!!errors.website}
            helperText={errors.website?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Portfolio"
            {...register('portfolio')}
            error={!!errors.portfolio}
            helperText={errors.portfolio?.message}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Próximo
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
