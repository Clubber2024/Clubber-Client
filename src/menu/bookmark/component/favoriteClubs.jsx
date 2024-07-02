import React from 'react';
import PropTypes from 'prop-types';

export default function FavoriteClubs({ id, type, name }) {
    return (
        <div>
            <p>{name}</p>
            <p>{type}</p>
        </div>
    );
}

FavoriteClubs.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
