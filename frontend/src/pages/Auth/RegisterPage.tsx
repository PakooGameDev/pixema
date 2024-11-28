import React from 'react';
import { Register } from '../../entities/index';
import { observer } from 'mobx-react-lite';
import { AuthWrapper } from '../../widgets/index';

const RegisterPage: React.FC = () => {
    return (
        <AuthWrapper>
            <Register />
        </AuthWrapper>
    );
};

export default observer(RegisterPage);

