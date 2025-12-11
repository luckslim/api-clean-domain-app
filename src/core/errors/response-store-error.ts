export class ResponseStoreError extends Error{
    constructor(){
        super('Please, wait a response from store.')
    }
}