export class Activity{
    constructor(
        public name?:string,
        public duration?:number,
        public startTime?:string,
        public notes?:string,
        public id?:string,
        public order?:number,
        public planId?:string,
    ){}
}