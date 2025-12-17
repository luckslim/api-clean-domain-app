export class DayListedError extends Error{
    constructor(){
        super('there are not Day configured in store')
    }
}