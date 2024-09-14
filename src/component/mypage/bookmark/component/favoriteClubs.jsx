import React from 'react';
import PropTypes from 'prop-types';
import styles from './favoriteClubs.module.css';

export default function FavoriteClubs({ id, type, name }) {
    return (
        <div key={id}>
            <p className={styles.ClubName}>{name}</p>
            <p className={styles.ClubType}> {type}</p>
        </div>
    );
}

FavoriteClubs.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
