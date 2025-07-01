import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiexContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

function CityItem({ city }) {
    const {currentCity} = useCities();
    const { cityName, emoji, date, id, position } = city;
    const { lat, lng } = position;
    return (
        <li>
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

CityItem.propTypes = {
    city: PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date),
        ]).isRequired,
        id: PropTypes.number.isRequired,
        position: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    }).isRequired,
};

export default CityItem;
