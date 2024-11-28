import React from 'react';
import { Reset } from '../../entities/index';
import { observer } from 'mobx-react-lite';
import { AuthWrapper } from '../../widgets/index';

const ResetPage: React.FC = () => {
    return (
        <AuthWrapper>
            <Reset />
        </AuthWrapper>
    );
};

export default observer(ResetPage);

