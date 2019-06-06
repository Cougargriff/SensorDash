

/*
    Action types
*/

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_HR_VALS = 'GET_HR_VALS'

function login(authUser) {
    return {
        type: LOGIN,
        authUser
    }
}

function get_hr_vals() {
    return {
        type: GET_HR_VALS,
        
    }
}

function logout(authUser) {
    return {
        type: LOGOUT,
        authUser
    }
}

