import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsSubject =
    new BehaviorSubject<any[]>([]);

  notifications$ =
    this.notificationsSubject.asObservable();

  private notifications: any[] = [];

add(message: string) {

  console.log('Notification added:', message);

  this.notifications.unshift({

    message,

    time: new Date()

  });

  console.log(this.notifications);

  this.notificationsSubject.next([...this.notifications]);

}

  clear() {

    this.notifications = [];

    this.notificationsSubject.next([]);

  }
  

}