import {
	loginRequired,
	passwordRequired,
	userSignUp,
	passwordSignUp,
	email,
	nameRequired,
	codeRequired,
} from '../../utils/validations';

export const validations = {
	login: loginRequired,
	password: passwordRequired,
};

export const signUpValidations = {
	password: passwordSignUp,
	username: userSignUp,
	email,
	name: nameRequired,
};

export const otpValidations = {
	otp: codeRequired,
};

export const content = {
	text: {
		loginButton: 'Iniciar sesión',
		loginForm: 'Iniciar sesión',
		passwordInput: 'Contraseña',
		loginInput: 'Usuario o contraseña',
		signUpButton: 'Registrarse',
		signUpForm: 'Registrarse',
		otpInput: 'Code',
		otpButton: 'Validate code',
	},
};

export const splash_screen_content = {
	texts: {
		title: 'Academia',
		description: 'Plataforma de gestión de la academia',
	},
};
