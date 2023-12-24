import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CityItem from './CityItem';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
const BASE_URL = 'https://testing-cities.onrender.com/api';
function CityList() {
	const { cities, isLoading } = useCities();
	console.log(cities);
	useEffect(() => {
		async function fetchCitiesNew() {
			const res = await fetch(`${BASE_URL}/cities`);
			console.log(res);
			const data = await res.json();
			console.log(data);
		}
		fetchCitiesNew();
	}, []);
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message message='Add your first city by clicking on the city on the map' />
		);
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}

export default CityList;
