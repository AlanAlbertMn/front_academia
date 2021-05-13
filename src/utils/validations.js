import {language} from '../config';

export const costRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Cost is required'
                : '^*El precio es requerido'
    }
}

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

export const instructorsRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*You must set at least one instructor'
                : '^*Debes seleccionar al menos un instructor'
    }
}

export const hoursPerWeekRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*Hours per week are required'
                : '^*Las horas por semana son requeridas'
    }
}

export const genderRequired = {
    presence: {
        allowEmpty: false,
        message: '^*El género es requerido'
    }
}


export const birthdayRequired = {
    presence: {
        allowEmpty: false,
        message: '^*La fecha de nacimiento es requerida'
    }
}

export const addressRequired = {
    presence: {
        allowEmpty: false,
        message: '^*La dirección es requerida'
    }
}

export const inscriptionDateRequired = {
    presence: {
        allowEmpty: false,
        message: '^*La fecha de inscripción es requerida'
    }
}

export const medicalDataRequired = {
    presence: {
        allowEmpty: false,
        message: '^*Los datos médicos son requeridos'
    }
}

export const taxDataRequired = {
    presence: {
        allowEmpty: false,
        message: '^*Los datos fiscales son requeridos'
    }
}


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

export const studentRequired = {
    presence: {
        allowEmpty: false,
        message: '^*El estudiante es requerido'
    }
}

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

export const scheduleRequired = {
    presence: {
        allowEmpty: false,
        message:
            language === 'en'
                ? '^*The schedule is requireed'
                : '^*El horario es requerido'
    }
}