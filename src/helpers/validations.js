const textField = (val) => {
    const regex = /^[A-Za-z0-9-]/;
    return val.length > 0 && regex.test(val);
}

const emailField = (val) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
    return regex.test(val);
}

const passwordField = (val) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(val);
}

export { textField, emailField, passwordField };