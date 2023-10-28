export const validateName = (value: string) => {
    return value.length > 0;
}

export const validateEmail = (value: string) => {
    return value.toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const validatePhone = (value: string) => {
    const numberRegExp = /^\+?375[1-9][1-9][0-9]{7}$/;
    return numberRegExp.test(value.replace(/\D/g, ''))
}

export const validateMessage = (value: string) => {
    return value.length > 0;
}
