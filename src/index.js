import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { deepBlue, lightPurple, white, deepPurple } from './utils/colors';
import Firebase, { FirebaseContext } from './components/Firebase';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: lightPurple,
		},
		primary: {
			light: deepBlue,
			main: deepBlue,
			dark: deepBlue,
			contrastText: white,
		},
		secondary: {
			main: deepPurple,
			dark: deepPurple,
			contrastText: white,
		},
		error: {
			main: '#ff0000',
			contrastText: '#000',
		},
	},
	typography: {
		fontFamily: ['Titillium Web', 'sans-serif'].join(','),
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<FirebaseContext.Provider value={new Firebase()}>
				<Router>
					<CssBaseline />
					<App />
				</Router>
			</FirebaseContext.Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
