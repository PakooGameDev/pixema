import React from 'react';
import { Login } from '../../entities/index';
import { AuthWrapper } from '../../widgets/index';

const LoginPage: React.FC = () => {
    return (
        <AuthWrapper>
            <Login />
        </AuthWrapper>
    );
};

export default LoginPage;