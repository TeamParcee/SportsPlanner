import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor() { }

  currentPlan;
  
  currentPlanObs = new Observable((observer)=>{
    observer.next()
  })


  selectPlan(plan) {
   
  }
}



