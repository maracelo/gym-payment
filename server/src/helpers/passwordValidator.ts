import PasswordValidator from "password-validator";

const schema = new PasswordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)

function passwordValidator(password: string){
    const validation = schema.validate(password);
    return validation;
}

export default passwordValidator;