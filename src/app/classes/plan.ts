export class Plan {
    constructor(
        public day?:string,
        public id?:string,
        public activity?:string,
        public uid?:string,
        public startTime?:string,
        public isCurrent?: boolean
    ){}
}
