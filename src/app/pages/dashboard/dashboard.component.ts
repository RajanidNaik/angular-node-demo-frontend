import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { DashboardService } from '../../services/dashboard.service';
import { ChartsComponent } from '../../shared/components/charts/charts.component';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user: any;

  dashboard: any = {};
  summary: any = {};
  roleLabels: string[] = [];
  roleSeries: number[] = [];
  priorityLabels: string[] = [];
  prioritySeries: number[] = [];
  statusLabels: string[] = [];
  statusSeries: number[] = [];

  chartType:
    'pie' |
    'bar' |
    'donut' = 'pie';

  currentUser: any;

  isHR = false;

  isManager = false;

  isEmployee = false;
  

  constructor(
    public authService: AuthService,
    private router: Router,
    private socketService: SocketService,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
     private notificationService: NotificationService
    
  ) { }

  ngOnInit() {

    this.authService.user$

      .subscribe(user => {

        this.user = user || {};
        this.isHR =
          this.user.role === 'HR';

        this.isManager =
          this.user.role === 'Manager';

        this.isEmployee =
          this.user.role === 'Employee';

      });
    this.loadDashboard();
    this.getChart();

  }
  loadDashboard() {

    this.dashboardService
      .getDashboard()
      .subscribe((res: any) => {

        this.dashboard = res;

      });

  }

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

getChart(): void {


    const currentUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.user = currentUser;

    this.isHR =
      currentUser.role === 'HR';

    this.isManager =
      currentUser.role === 'Manager';

    this.isEmployee =
      currentUser.role === 'Employee';

    this.dashboardService
      .getSummary()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Dashboard summary:',
            res
          );

          this.summary = res;


          this.roleLabels =
            (res.roleChart || []).map(
              (item: any) =>
                item.role ?? 'Unknown'
            );

          this.roleSeries =
            (res.roleChart || []).map(
              (item: any) =>
                Number(item.count ?? 0)
            );


          this.priorityLabels =
            (res.priorityChart || []).map(
              (item: any) =>
                item.priority ?? 'Unknown'
            );

          this.prioritySeries =
            (res.priorityChart || []).map(
              (item: any) =>
                Number(item.count ?? 0)
            );

          this.statusLabels = [
            'Pending',
            'In Progress',
            'Completed'
          ];

          this.statusSeries = [
            Number(res.pending ?? 0),
            Number(res.inProgress ?? 0),
            Number(res.completed ?? 0)
          ];

        },

        error: (error) => {

          console.error(
            'Error fetching dashboard summary:',
            error
          );

        }

      });

  }


}