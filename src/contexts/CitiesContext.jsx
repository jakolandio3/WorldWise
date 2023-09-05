import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(
		() =>
			async function fetchCities() {
				try {
					setIsLoading(true);
					const res = await fetch(`${BASE_URL}/cities`);
					const data = await res.json();
					setCities(data);
				} catch (error) {
					console.log(error);
				} finally {
					setIsLoading(false);
				}
			},
		[]
	);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch (error) {
			alert('There was an error fetching the city list');
		} finally {
			setIsLoading(false);
		}
	}
	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await res.json();
			setCities((cities) => [...cities, data]);
		} catch (error) {
			alert('There was an error creating the city');
		} finally {
			setIsLoading(false);
		}
	}
	async function deleteCity(id) {
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});

			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch (error) {
			alert('There was an error deleting city');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error('CitiesContext was used outside of the CitiesProvider');
	return context;
}

export { useCities, CitiesProvider };
