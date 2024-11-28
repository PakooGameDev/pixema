import React from 'react';
import {ContentWrapper,MovieList} from '../../widgets/index';
import { observer } from 'mobx-react-lite';

const TrendsPage: React.FC = () => {
  
  return (
    <ContentWrapper activePage="trends">
      <MovieList url="trends" />
    </ContentWrapper>
  );
};

export default observer(TrendsPage);