import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <Alert severity="error" className="mb-4">
                    {error}
                </Alert>
            )}
            
            <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Login
            </Button>
            
            <Button
                variant="text"
                fullWidth
                onClick={() => navigate('/register')}
            >
                Don't have an account? Register
            </Button>
        </form>
    );
};

export default LoginForm;
