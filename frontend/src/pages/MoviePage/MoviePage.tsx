import React from 'react';
import MoviePageScreen from '../../components/screens/MoviePage/MoviePage';
import ContentSection from '../../components/layout/ContentSection/ContentSection';

const MoviePage: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="homes" 
      ContentComponent={
        <MoviePageScreen 
            key={1}
            movieData={{
              title:'Wonder Woman: 1984', 
              genres:['Comedy', 'Action'],
              imageUrl:'' ,
              rating:8.2 ,
              description:'In 1984, after saving the world in Wonder Woman (2017), the immortal Amazon warrior, Princess Diana of Themyscira, finds herself trying to stay under the radar, working as an archaeologist at the Smithsonian Museum. With the memory of the brave U.S. pilot, Captain Steve Trevor, etched on her mind, Diana Prince becomes embroiled in a sinister conspiracy of global proportions when a transparent, golden-yellow citrine gemstone catches the eye of the power-hungry entrepreneur, Maxwell Lord. ',
              duration:130,
              release:'12.08.2024',
              country:"United Kingdom, United States",
              currency:1547432654,
              production:'Paramaunt Comedy',
              actors:'Mattew Howard, Emma Wotson',
              writers:'Rowling J.D.',
              director:'Billy Willy',
            }} 
        />
      } 
    />
  );
};

export default MoviePage;