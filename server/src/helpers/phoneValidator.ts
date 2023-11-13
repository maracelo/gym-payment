import { phone } from "phone";
import validator from "validator";

function phoneValidator(phoneN: string): string | null{
    const filteredPhone = validator.whitelist(phoneN, '+0123456789')

    if(filteredPhone && phone(filteredPhone, {country: 'BR'}).isValid) return filteredPhone;

    return null; 
}

export default phoneValidator;