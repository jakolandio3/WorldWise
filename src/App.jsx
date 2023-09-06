// import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';

import CountryList from './components/CountriesList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';

export default function App() {
	return (
		<>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route path='product' element={<Product />} />
						<Route path='login' element={<Login />} />
						<Route path='pricing' element={<Pricing />} />
						<Route index element={<HomePage />} />
						<Route path='*' element={<PageNotFound />} />
						<Route path='app' element={<AppLayout />}>
							<Route index element={<Navigate replace to='cities' />} />
							<Route path='cities' element={<CityList />} />
							<Route path='cities/:id' element={<City />} />
							<Route path='countries' element={<CountryList />} />
							<Route path='form' element={<Form />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</>
	);
}