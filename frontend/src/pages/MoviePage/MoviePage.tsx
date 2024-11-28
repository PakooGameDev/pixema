import React from 'react';
import {  useParams } from 'react-router-dom';
import {ContentWrapper,MovieWidget} from '../../widgets/index';
import { observer } from 'mobx-react-lite';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <ContentWrapper activePage="homes">
      <MovieWidget key={id} id={id || ''}/>
    </ContentWrapper>
  );
};

export default observer(MoviePage);

