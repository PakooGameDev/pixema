import React, {useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.scss'
import { transformString } from '../../shared/lib/utils/format/FormatString';
import ToggleSwitch from '../../shared/ui/ToggleSwitch/ToggleSwitch';
import { useTheme } from '../../app/providers/ThemeContext';
import Input from '../../shared/ui/Input/Input';
import { Context } from '../../index';

const Settings: React.FC = () => {
  const { theme } = useTheme(); // Получаем текущую тему из контекста
  const {store} = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSave = async (e: React.FormEvent) => {
    store.updateUserData(name, email, currentPassword, newPassword, confirmPassword)  
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await store.logout()
    navigate('/login');
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings__block}>
        <h3>Profile</h3>
        <div className={styles.settings__block_content}>
          <Input
            className={styles.field}
            label="Name"
            type='text'
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className={styles.field}
            label="Email"
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.settings__block}>
        <h3>Password</h3>
        <div className={styles.settings__block_content}>
          <Input
            className={styles.field}
            label='Password'
            type='password'
            placeholder='Your password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div className={styles.settings__block_reset}>
            <Input
              className={styles.field}
              label='New password'
              type='password'
              placeholder='New password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              className={styles.field}
              label='Confirm password'
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.settings__block}>
        <h3>Color mode</h3>
        <div className={`${styles.settings__block_content} ${styles.settings__block_color}`}>
          <div className={styles.settings__block_info}>
            <h4>{transformString(theme, 'capitalize')}</h4>
            <p>Use {transformString(theme, 'lowercase')} theme</p>
          </div>
          <div className={styles.settings__block_checker}>
            <ToggleSwitch />
          </div>
        </div>
      </div>
      <div className={styles.settings__btns}>
        <button className={styles.settings__btns_cancel} onClick={() => handleLogout()}>Log out</button>
        <button className={styles.settings__btns_save} onClick={(e) => handleSave(e)}>{'Save'}</button>
      </div> 
    </div>
  );
};
export default Settings;

