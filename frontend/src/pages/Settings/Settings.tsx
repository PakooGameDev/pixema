import React from 'react';
import SettingsScreen from '../../components/screens/Settings/Settings';
import ContentSection from '../../components/layout/ContentSection/ContentSection';
import { observer } from 'mobx-react-lite';


const Settings: React.FC = () => {

  return (
    <ContentSection 
      defaultTab="settings" 
      ContentComponent={<SettingsScreen />} 
    />
  );
};

export default observer(Settings);