import {language} from '../config';

export const email = {
    email: {
        message:
            language === 'en'
                ? '^*Valid mail is required'
                : '^*Introduce un email válido',
    },
    presence: {
        allowEmpty: false,
        message: '^*Mail is required',
    },
};

export const codeRequired = {
    presence: {
        allowEmpty: false,
        message: '^The code is required',
    },
};

export const lastNameRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Last name is required'
                : '^*Los apellidos son requeridos'
    }
}

export const loginRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Username or email is required'
                : '^*Introduce un usuario o email',
    },
};
export const user = {
    presence: {
        allowEmpty: false,
        message: '^*User is required',
    },
};

export const userLogin = {
    ...user,
};

export const roleRequired = {
    presence: {
        allowEmpty: false,
        message: '^*Role is required',
    },
};

export const nameRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Name is required'
                : '^*El nombre es requerido'
    },
};

export const phoneRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Phone is required'
                : '^*El teléfono es requerido'
    }
}

export const userSignUp = {
    ...user,
    length: {
        minimum: 7,
        maximum: 20,
        tooShort: '^*Username length must be at least 7 characters',
        tooLong: '^*Username length cannot be longer than 20 characters',
    },
};

export const passwordRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Password is required'
                : '^*La contraseña es requerida',
    },
};

export const passwordSignUp = {
    length: {
        minimum: 6,
        maximum: 20,
        tooShort: language === 'en' ? '^*Password length must be at least 7 characters' : '^*La contraseña debe tener al menos 7 caracteres',
        tooLong: language === 'en' ? '^*Password length cannot be longer than 20 characters' : '^*La contraseña no debe tener una magnitud de más de 20 caracteres',
    },
};
