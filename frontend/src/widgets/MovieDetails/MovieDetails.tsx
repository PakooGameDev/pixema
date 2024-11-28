import React from 'react';
import styles from './MovieDetails.module.scss';
import {InfoItem} from '../../shared/ui/index';
import formatDate from '../../shared/lib/utils/format/FormatDate';
import formatNumber from '../../shared/lib/utils/format/FormatNumber';
import { IMovie } from '../../shared/api/models/IMovie';

interface MovieDetailsProps {
    data: IMovie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ data }) => {
    return (
        <div className={styles.movie__content}>
            <div className={styles.movie__content_genres}>
                <p className={styles.movie__genres}>{data.genre.split('|').join(' • ')}</p>
                <h1 className={styles.movie__title}>{data.title}</h1>
            </div>
            <div className={styles.movie__content_ratings}>
                <div className={styles.movie__info}>{data.ratings}</div>
                <div className={styles.movie__info}>IMDb {data.ratings}</div>
                <div className={styles.movie__info}>{data.duration} min</div>
            </div>
            <div className={styles.movie__content_description}>
                <p className={styles.movie__text}>{data.movie_description}</p>
            </div>
            <div className={styles.movie__content_data}>
                <InfoItem title={'Year'} description={data.release_date.split('-')[0]} />
                <InfoItem title={'Released'} description={formatDate(data.release_date, 'DD MMM YYYY')} />
                <InfoItem title={'BoxOffice'} description={`${formatNumber(data.budget)}`} />
                <InfoItem title={'Country'} description={data.country} />
                <InfoItem title={'Production'} description={data.production_companies} />
                <InfoItem title={'Actors'} description={data.actors} />
                <InfoItem title={'Director'} description={data.director} />
                <InfoItem title={'Writers'} description={data.writers} />
            </div>
        </div>
    );
};

export default MovieDetails;
