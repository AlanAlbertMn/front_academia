import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '../../utils/colors';

export const useLoginStyles = makeStyles((theme) => ({
	root: {
		minHeight: 750,
		height: '100vh',
		maxHeight: 'auto',
		padding: '100px 50px 100px 50px',
		zIndex: '-1',
	},
	rootSm: {
		minHeight: 600,
		height: '100vh',
		maxHeight: 'auto',
		padding: '15px 15px 15px 15px',
		zIndex: '-1',
	},
	container: {
		height: '100%',
		margin: 0,
		padding: 0,
	},
	containerSm: {
		height: '100%',
		margin: 0,
		padding: 0,
	},
	field: {
		marginBottom: 32,
	},
	splashScreenContainer: {
		padding: '0px 20px 0px 20px',
		height: '100%',
		minHeight: 600,
		background: 'rgb(4,150,255)',
		background:
			'linear-gradient(56deg, rgba(4,150,255,1) 0%, rgba(153,226,235,1) 100%)',
		borderRadius: '8px 0px 0px 8px',
	},
	loginContainer: {
		padding: '0px 0px 0px 0px',
		backgroundColor: deepPurple,
		height: '100%',
		minHeight: 600,
		borderRadius: '0px 8px 8px 0px',
	},
	splashScreenContainerSm: {
		padding: '20px 20px 20px 20px',
		height: 600,
		background: 'rgb(4,150,255)',
		background:
			'linear-gradient(56deg, rgba(4,150,255,1) 0%, rgba(153,226,235,1) 100%)',
		borderRadius: '15px 15px 15px 15px',
	},
	loginContainerSm: {
		padding: '0px 0px 0px 0px',
		backgroundColor: deepPurple,
		height: 600,
		borderRadius: '15px 15px 15px 15px',
	},

	title: {
		fontWeight: 500,
		marginTop: '25px',
		marginBottom: 25,
	},
	bitcoinContainer: {
		height: 250,
	},
	bitcoinContainerSm: {
		height: 100,
	},
	bitcoin: {
		height: '100%',
		width: 'auto',
	},
	loginButton: {
		marginTop: 25,
	},
	mb4: {
		marginBottom: 32,
	},
}));
