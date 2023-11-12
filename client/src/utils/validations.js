export default function validation(value){
    let errors = {}
    
    if(!(value.email.includes('@'))){
        errors.e1 = 'Email is not valid';
    }

    if(!value.email){
        errors.e2 = "Ingrese el email";
    }

    if (value.email.length > 35){
        errors.e3 = "Menos de 35 caracteres";
    }

    if(!/\d/.test(value.password)){
        errors.p1 = 'Al menos debe tener un número';
    }

    if(value.password.length < 6 || value.password.length > 10){
        errors.p2 = 'Longitud incorrecta';
    }
    return errors;
}