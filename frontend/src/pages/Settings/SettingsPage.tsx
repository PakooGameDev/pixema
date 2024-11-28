import React from 'react';
import {ContentWrapper, Settings} from '../../widgets/index';
import { observer } from 'mobx-react-lite';

const SettingsPage: React.FC = () => {

  return (
    <ContentWrapper activePage="settings">
      <Settings />
    </ContentWrapper>
  );
};

export default observer(SettingsPage);