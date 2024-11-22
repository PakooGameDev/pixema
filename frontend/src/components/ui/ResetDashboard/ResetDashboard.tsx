import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResetDashboard.module.scss';
// Импорт функции не нужен, это просто страница-редирект

const ResetDashboard: React.FC = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // handleClick не нужен, так как это страница-редирект.  Перенаправление происходит сразу же.
    React.useEffect(() => {
      navigate('/NewPassword'); // Перенаправление на страницу NewPassword сразу при рендеринге компонента.
    }, [navigate]);


    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Password Reset</h2>
            <div className={styles.auth__inputs_text}>Your password has been reset. Please create a new one.</div>
            {error && <div className={styles.auth__inputs_error}>{error}</div>} {/* Отображение ошибки, если она есть */}
        </div>
    );
};

export default ResetDashboard;
