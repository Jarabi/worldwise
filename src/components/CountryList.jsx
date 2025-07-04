import PropTypes from 'prop-types';
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesContext';
import styles from './CountryList.module.css';

function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message='Add your first city by clicking on a city on the map.' />
        );

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [
                ...arr,
                { country: city.country, emoji: city.emoji, id: city.id },
            ];
        return arr;
    }, []);

    return (
        <div className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </div>
    );
}

CountryList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
