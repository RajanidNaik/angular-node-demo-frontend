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
  chartLabels: string[] = [];

  chartSeries: number[] = [];
  priorityLabels: string[] = [];

prioritySeries: number[] = [];

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
  getChart() {
    const currentUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.user = currentUser;

    this.isHR = currentUser.role === 'HR';
    this.isManager = currentUser.role === 'Manager';
    this.isEmployee = currentUser.role === 'Employee';
    this.dashboardService

      .getSummary()

      .subscribe((res: any) => {

        this.summary = res;

        if (this.isHR) {

          this.chartType = 'pie';

          this.chartLabels =

            res.roleChart.map(

              (x: any) => x.role

            );

          this.chartSeries =

            res.roleChart.map(

              (x: any) => x.count

            );
              this.priorityLabels =
    res.priorityChart.map((x: any) => x.priority);

  this.prioritySeries =
    res.priorityChart.map((x: any) => x.count);

        }

        else if (this.isManager) {

          this.chartType = 'bar';

          this.chartLabels =

            res.taskStatus.map(

              (x: any) => x.status

            );

          this.chartSeries =

            res.taskStatus.map(

              (x: any) => x.count

            );

        }

        else {

          this.chartType = 'donut';

          this.chartLabels = [

            'Pending',

            'In Progress',

            'Completed'

          ];

          this.chartSeries = [

            res.pending,

            res.inProgress,

            res.completed

          ];


        }

      });
  }

}