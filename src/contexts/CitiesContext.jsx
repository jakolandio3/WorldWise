import { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};
function reducer(state, action) {
	switch (action.type) {
		default:
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload };
		case 'loading':
			return { ...state, isLoading: true };
		case 'cities/loaded':
			return { ...state, cities: action.payload, isLoading: false };
		case 'cities/current':
			return { ...state, currentCity: action.payload, isLoading: false };
		case 'cities/created':
			return {
				...state,
				cities: [...state.cities, action.payload],
				isLoading: false,
			};
		case 'cities/deleted':
			return {
				...state,
				cities: state.cities.filter((city) => city.id !== action.payload),
				isLoading: false,
			};
	}
}

function CitiesProvider({ children }) {
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cities, isLoading, currentCity } = state;
	useEffect(
		() =>
			async function fetchCities() {
				dispatch({ type: 'loading' });
				try {
					const res = await fetch(`${BASE_URL}/cities`);
					const data = await res.json();
					dispatch({ type: 'cities/loaded', payload: data });
				} catch (error) {
					dispatch({
						type: 'rejected',
						payload: 'There was an error loading the city list',
					});
				}
			},
		[]
	);

	async function getCity(id) {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: 'cities/current', payload: data });
		} catch (error) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error fetching the city',
			});
		}
	}
	async function createCity(newCity) {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await res.json();
			dispatch({ type: 'cities/created', payload: data });
		} catch (error) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error creating the city',
			});
		}
	}
	async function deleteCity(id) {
		dispatch({ type: 'loading', payload: true });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'cities/deleted', payload: id });
		} catch (error) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error deleting city',
			});
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
