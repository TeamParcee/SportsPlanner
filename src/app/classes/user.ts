export class User {

    constructor(
        public fname?:string,
        public lname?:string,
        public uid?:string,
        public email?:string,
        public photoUrl?:string,
        public isHeadCoach?:boolean,
        public coachPassword?:string,
        public sport?:string,
        public coach?:string
    ){}
}