export const validatePassword = (password) => {
    const regex = /^\S{8,12}$/

    return regex.test(password)
}

export const validatePasswordMessage = 'El password debe de contener entre 8 a 12 caracteres sin espacios'