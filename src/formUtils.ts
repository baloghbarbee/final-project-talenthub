import validator from 'validator'


export function isMailValid(text: string) {
    return /^(?:[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+)*)@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/.test(text);
}

export function isNameValid(text: string) {
    return /^[a-zA-Z]+$/.test(text);
}

export function isBirthdateValid(text: string) {
    return /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{4})$/.test(text) && validator.isDate(text, {
        delimiters: ['.'],
        format: 'DD.MM.YYYY',
    });
};

export function isLengthValid(text: string, length: number) {
    return text.length > length;
}

export function ageValidation(text: string) {
    const currentYear = new Date().getFullYear();
    const year = parseInt(text.split(".")[2]);
    const age = currentYear - year;

    return (age > 18 && age < 99);
}


