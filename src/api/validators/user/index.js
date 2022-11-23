const nameValidator = value => {
    let trimStr = value.replace(/^\s+|\s+$/g, '');
    trimStr = trimStr.replace(/\s+/g, ' ');
    if (trimStr === value)
        return true;
    return false
}

const emailValidate = value => {
    let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegx.test(value))
        return true;
    return false;
}

const phoneNoValidator = value => {
    if (String(value).length === 10)
        return true;
    return false;
}

const passwordValidator = value => {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (value && value.match(regex))
        return true;
    return false;
}


module.exports = {
    nameValidator,
    emailValidate,
    phoneNoValidator,
    passwordValidator,
}