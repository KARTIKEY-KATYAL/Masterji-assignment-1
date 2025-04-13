// Function Context

const username = "kartikey"

function login() {
    const password = "imKk@0106"
    console.log(`${username} is logged with password ${password}`)
}

login()


// Example of Clousure

function CallApi(method) {
    return function (url){
        console.log(`${url} called by ${method}`)
    }
}

CallApi('GET')('http://localhost:3000')