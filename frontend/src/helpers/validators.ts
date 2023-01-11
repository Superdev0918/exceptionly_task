export function validateFirstName(name: string) {
    if (name.length === 0) return 'This field is required'
    else if (name.length < 2) return 'First name must be at least 2 characters'
    else if (name.length > 20) return 'First name must be maximum of 20 characters'
    else return ''
}

export function validateLastName(name: string) {
    if (name.length === 0) return 'This field is required'
    else if (name.length < 2) return 'Last name must be at least 2 characters'
    else if (name.length > 20) return 'Last name must be maximum of 20 characters'
    else return ''
}

export function validateEmail(email: string) {
    if(email.length === 0)  return 'This field is required'
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const ok = re.test(String(email).toLowerCase())
    return ok ? '' : 'Please insert a valid email'
}

export function validateLoginPassword(password: string) {
    if (password.length === 0) return 'No password provided.'
    else return ''
}


export function validatePassword(password: string) {
    if(password.length === 0)  return 'No password provided.'
    const lowerCaseLetters = /[a-z]/g
    const upperCaseLetters = /[A-Z]/g
    const numbers = /[0-9]/g
    const specialCharacters = /[!@#$%^&*]/g
    if(!(password.match(lowerCaseLetters))) return 'Must contain at least one tiny letter'
    else if(!(password.match(upperCaseLetters))) return 'Must contain at least one capital letter'
    else if(!(password.match(numbers))) return 'Must contain at least one number'
    else if(!(password.match(specialCharacters))) return 'Must contain at least one special character'
    else if(password.length < 9) return 'Password is too short - should be 8 chars minimum.'
    else if(password.length > 20) return 'Password is too long - should be 20 chars maximum.'
    else return ''
}
