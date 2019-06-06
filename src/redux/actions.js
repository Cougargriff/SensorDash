/*
    Action types
*/

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


function login(authUser) {
    return {
        type: LOGIN,
        authUser
    }
}

function logout(authUser) {
    return {
        type: LOGOUT,
        authUser
    }
}

