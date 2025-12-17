export class ResourceNotFoundError extends Error{
    constructor(message?: string){
        super(`Resource not found. ${message}`)
    }
}