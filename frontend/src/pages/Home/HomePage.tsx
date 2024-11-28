import React from 'react';
import {ContentWrapper,MovieList} from '../../widgets/index';
import { observer } from 'mobx-react-lite';

const HomePage: React.FC = () => {
  
  return (
    <ContentWrapper activePage="homes">
      <MovieList url="homes" />
    </ContentWrapper>
  );
};

export default observer(HomePage);