import {
	codeRequired,
	email,
	lastNameRequired,
	loginRequired,
	nameRequired,
	passwordRequired,
	passwordSignUp,
	phoneRequired
} from '../../utils/validations';

export const validations = {
	login: loginRequired,
	password: passwordRequired,
};

export const signUpValidations = {
	password: passwordSignUp,
	nombre: nameRequired,
	apellidos: lastNameRequired,
	telefono: phoneRequired,
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
		loginInput: 'Email',
		signUpButton: 'Registro padres',
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
