import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any = {};
  notifications: any[] = [];

showNotifications = false;
menuOpen = false;
  constructor(
    private router: Router,
    private authService: AuthService,
     public notificationService: NotificationService,
     private socketService: SocketService,
     private toastr: ToastrService,
  ) {}
  

ngOnInit() {

  this.authService.user$
    .subscribe(user => {
      this.user = user || {};
    });

  this.notificationService.notifications$
    .subscribe(res => {
      this.notifications = res;
    });

  this.socketService.onNewCustomer((data: any) => {

    this.toastr.success(data.message, 'Customer');

    this.notificationService.add(data.message);

  });

  this.socketService.onNewTask((data: any) => {

    this.toastr.info(data.message, 'Task');

    this.notificationService.add(data.message);

  });

  this.socketService.onTaskUpdated((data: any) => {

    this.toastr.warning(data.message, 'Task');

    this.notificationService.add(data.message);

  });

}
toggleMenu(){

  this.menuOpen = !this.menuOpen;

}


  logout() {

    localStorage.removeItem('token');
    this.authService.setUser(null);

    this.router.navigate(['/login']);

  }
  clearAll() {

  this.notificationService.clear();

  this.notifications = [];

  this.showNotifications = false;

}
}
