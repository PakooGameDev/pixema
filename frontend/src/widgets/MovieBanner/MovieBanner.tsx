import React from 'react';
import styles from './MovieBanner.module.scss';
import { ReactComponent as Favorites } from '../../shared/assets/svg/Favorites.svg';
import { ReactComponent as Share } from '../../shared/assets/svg/Share.svg';

interface MovieBannerProps {
    posterImage: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onShare: () => void;
}

const MovieBanner: React.FC<MovieBannerProps> = ({ posterImage, isFavorite, onToggleFavorite, onShare }) => {
    return (
        <div className={styles.banner}>
            <div className={styles.banner__poster}>
                <img src={posterImage} alt="Movie Poster" className={styles.banner__image} />
            </div>
            <div className={styles.banner__buttons}>
                <button className={styles.banner__buttons_btn} onClick={onToggleFavorite}>
                    <Favorites className={`${styles.banner__buttons_icon} ${isFavorite ? styles.favorite : ''}`} />
                </button>
                <button className={styles.banner__buttons_btn} onClick={onShare}>
                    <Share className={styles.banner__buttons_icon} />
                </button>
            </div>
        </div>
    );
};

export default MovieBanner;
