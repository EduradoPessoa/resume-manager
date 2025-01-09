import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useAuth from '../../hooks/useAuth';

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default AuthGuard;
