import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { PlanService } from './plan.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private planService: PlanService,
    private nativeAudio: NativeAudio,
    private media: Media,
  ) { }


  showAlert;
  timerInterval;
  vibrationInterval;
  activeTime;
  activeActivity;
  count = 0;
  activeStart;
  length;
  nextActivity;
  user;
  stopAlert = false;
  currentActivity;
  file: MediaObject = this.media.create('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3');


  getTimerCount(activity, currentActivity) {

    if (!currentActivity) {
      currentActivity = { ...activity };
      currentActivity.name = "Time Unit First Activity"
    }
    this.timerInterval = setInterval(() => {
      let datetime = activity.date;

      let now = new Date().getTime();
      let countDownDate = new Date(datetime).getTime();
      let distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);


      let time = "";
      time += (days) ? days + " days " : "";
      time += (hours) ? hours + " hours " : "";
      time += (minutes) ? minutes + " mins " : "";
      time += (seconds) ? seconds + " secs " : "";


      if (distance < 0) {
        
        this.activeTime = "Time Past";
        if (this.showAlert) {
          this.startVibration();
          this.helper.stopTimerAlert(activity).then(() => {
            this.stopVibration();
            this.showAlert = true;
          })
        }
        this.activeActivity = activity.name;
        clearInterval(this.timerInterval);
        this.count++;
        this.startPlan();
      } else {
        this.showAlert = true;
        this.currentActivity = {
          time: time,
          name: currentActivity.name,
          startTime: currentActivity.startTime
        }
        this.nextActivity = {
          name: activity.name,
          startTime: activity.startTime
        }
      }
    }, 1000)
  }

  async startPlan() {
    let user: any = await this.userService.getUser();

    this.firebaseService.setDocument("users/" + user.uid + "/utilities/activeActivity", { active: true });
    this.length = this.planService.activities.length;
    if (this.length > this.count) {
      this.getTimerCount(this.planService.activities[this.count], this.planService.activities[this.count - 1]);
    } else {
      this.activeActivity = null;
      this.currentActivity = { name: "All Activities Have Ended", time: null};
      this.nextActivity = {
        name: "XXX",
        startTime: "XXXX",
      }
      clearInterval(this.timerInterval);
      this.count = 0
    }
  }

  async   stopPlan() {
    let user: any = await this.userService.getUser();
    this.firebaseService.setDocument("users/" + user.uid + "/utilities/activeActivity", { active: false })
    this.activeActivity = null;
    clearInterval(this.timerInterval);
    this.count = 0
  }

  startVibration(){
   
    this.file.play();
    
  }

  stopVibration(){
    this.file.stop();
  }
}
