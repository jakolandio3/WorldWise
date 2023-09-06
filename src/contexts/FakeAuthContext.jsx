import { createContext, useContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error('Auth context is being called outside of provider');
}
