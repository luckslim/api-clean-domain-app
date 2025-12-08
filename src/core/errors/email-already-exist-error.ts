export class EmailAlreadyExistError extends Error{
    constructor(){
        super('email already exist error')
    }
}