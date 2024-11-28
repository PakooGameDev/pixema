import React from 'react';
import { NewPassword } from '../../entities/index';
import { observer } from 'mobx-react-lite';
import { AuthWrapper } from '../../widgets/index';

const NewPasswordPage: React.FC = () => {
    return (
        <AuthWrapper>
            <NewPassword />
        </AuthWrapper>
    );
};

export default observer(NewPasswordPage);

