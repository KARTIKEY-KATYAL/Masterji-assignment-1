class ApiError extends Error{
    constructor(
        statuscode,
        message = "Something Went Wrong",
        errors = [],
        stack = ''
    ){
        super(message)
        this.message = message
        this.statuscode = statuscode
        this.errors = errors
        this.success = false

        if (stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(errors)
        }
    }
}

export default {ApiError}