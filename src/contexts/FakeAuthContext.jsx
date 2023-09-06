import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
	name: 'Jakob',
	email: 'jakob@example.com',
	password: 'dads',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};
const initialState = {
	user: null,
	isAuthenticated: false,
};

function reducer(state, action) {
	switch (action.type) {
		default:
			throw new Error('user is not authorized');
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				error: '',
			};
		case 'logout':
			return initialState;
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'login', payload: FAKE_USER });
		}
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error('Auth context is being called outside of provider');
	return context;
}

export { useAuth, AuthProvider };
