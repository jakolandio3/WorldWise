// import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import CityList from './components/CityList';
import CountryList from './components/CountriesList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import HomePage from './pages/HomePage';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

export default function App() {
	return (
		<>
			<AuthProvider>
				<CitiesProvider>
					<Suspense fallback={<SpinnerFullPage />}>
						<BrowserRouter>
							<Routes>
								<Route path='product' element={<Product />} />
								<Route path='login' element={<Login />} />
								<Route path='pricing' element={<Pricing />} />
								<Route index element={<HomePage />} />
								<Route path='*' element={<PageNotFound />} />
								<Route
									path='app'
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
									<Route index element={<Navigate replace to='cities' />} />
									<Route path='cities' element={<CityList />} />
									<Route path='cities/:id' element={<City />} />
									<Route path='countries' element={<CountryList />} />
									<Route path='form' element={<Form />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</Suspense>
				</CitiesProvider>
			</AuthProvider>
		</>
	);
}
