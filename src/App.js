import React, { useMemo } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import AppContext from './components/Context/AppContext';
import {getUserRoutes} from "./utils/utils";

function AppProvider(user) {
	this.user = user;
	this.routes = [];
	this.alert = {
		severity: null,
		open: false,
		text: '',
	};

	this.setUser = (newUser) => {
		this.user = newUser;
	};

	this.getUser = () => {
		return this.user;
	};

	this.setRoutes = () => {
		return this.routes;
	};

	this.setAlert = (alert) => {
		this.alert = alert;
	};
}

function App({history}) {
	const appProvider = useMemo(
		() =>
			new AppProvider({
				name: null,
				token: null,
				role: null,
			}),
		[]
	);

	const localUser = localStorage.getItem('academia-user');

	if (localUser) {
		const storedUser = JSON.parse(localUser)
		appProvider.setUser(storedUser);
		appProvider.setRoutes(getUserRoutes(storedUser))
	}

	return (
		<AppContext.Provider value={appProvider}>
			<div>
				<Navbar appProvider={appProvider} />
			</div>
		</AppContext.Provider>
	);
}

export default App;
