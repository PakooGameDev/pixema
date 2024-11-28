import React from 'react';
import {ContentWrapper,MovieList} from '../../widgets/index';
import { observer } from 'mobx-react-lite';

const FavoritesPage: React.FC = () => {
  
  return (
    <ContentWrapper activePage="favorites">
      <MovieList url="favorites" />
    </ContentWrapper>
  );
};

export default observer(FavoritesPage);