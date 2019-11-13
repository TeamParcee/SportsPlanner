import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { PlanService } from './plan.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private vibration: Vibration,
    private backgroundMode: BackgroundMode,
    private localNotification: LocalNotifications,
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
  file: MediaObject = this.media.create('https://firebasestorage.googleapis.com/v0/b/parceesportsplanner.appspot.com/o/iphone_alarm_morning.mp3?alt=media&token=76784c6e-1f1b-481a-a12f-7bc1cb121f6a');


  getTimerCount(activity, currentActivity) {

    if (!currentActivity) {
      currentActivity = { ...activity };
      currentActivity.name = "Time Until First Activity"
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
          startTime: currentActivity.startTime,
          notes: currentActivity.notes,
          duration: currentActivity.duration
        }
        this.nextActivity = {
          name: activity.name,
          startTime: activity.startTime
        }
      }
    }, 1000)
  }

  async startPlan() {
    this.backgroundMode.enable();
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
          startTime: "XXX",
        }
        clearInterval(this.timerInterval);
        this.count = 0
      }
  }

  async   stopPlan() {
    this.backgroundMode.disable();
    this.showAlert = false;
    let user: any = await this.userService.getUser();
    this.firebaseService.setDocument("users/" + user.uid + "/utilities/activeActivity", { active: false })
    this.activeActivity = null;
    clearInterval(this.timerInterval);
    this.count = 0
  }

  startVibration(){
    this.stopVibration();
    if(this.backgroundMode.isScreenOff){
      this.backgroundMode.unlock();
      this.showNotification();

    }
    this.vibrationInterval = setInterval(()=>{
      this.vibration.vibrate(1000)
    }, 1000)
    ;
    this.file.play({ numberOfLoops: 2 });

    
  }

  stopVibration(){
    clearInterval(this.vibrationInterval)
    this.file.stop();
  }

  showNotification(){
    // Schedule a single notification
this.localNotification.schedule({
  id: 1,
  text: 'Sports Planner',
  title: "Activity has finished",
  actions: [
    { id: 'ok', title: 'OK' },
]
});
  }
}
