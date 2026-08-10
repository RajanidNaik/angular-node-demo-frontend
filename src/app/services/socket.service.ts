import {
  Injectable
} from '@angular/core';

import {
  io,
  Socket
} from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket:
  Socket;

  constructor() {

this.socket = io(environment.backendUrl);

  }

  onNewCustomer(
    callback: any
  ) {

    this.socket.on(
      'newCustomer',
      callback
    );

  }
    onNewTask(callback: any) {

    this.socket.on(

      'newTask',

      callback

    );

  }

  onTaskUpdated(callback: any) {

    this.socket.on(

      'taskUpdated',

      callback

    );

  }
  removeAllListeners() {

  this.socket.off('newCustomer');

  this.socket.off('newTask');

  this.socket.off('taskUpdated');

}

}