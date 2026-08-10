import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  NgApexchartsModule,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent
  implements OnChanges {

  @Input()
  title = '';

  @Input()
  type:
    'pie' |
    'donut' |
    'bar' = 'pie';

  @Input()
  labels: string[] = [];

  @Input()
  series: number[] = [];

  chartOptions: any = {};

  ngOnChanges(
    changes: SimpleChanges
  ) {
      console.log('Type:', this.type);
  console.log('Labels:', this.labels);
  console.log('Series:', this.series);

    if (
      this.type === 'bar'
    ) {

      this.chartOptions = {

        chart: {

          type: 'bar',

          height: 350

        },

        series: [

          {

            name: this.title,

            data: this.series

          }

        ],

        xaxis: {

          categories: this.labels,

        },




        plotOptions: {
  bar: {
    columnWidth: '25%',
    borderRadius: 6,
    distributed: true
  }
}

      };

    }

    else {

this.chartOptions = {

  chart: {

    type: this.type,

    height: 350

  },

  labels: this.labels,

  series: this.series,

  legend: {

    show: true,

    position: 'bottom'

  },

  plotOptions: {

    pie: {

      expandOnClick: true

    }

  },

  responsive: [

    {

      breakpoint: 480,

      options: {

        legend: {

          position: 'bottom'

        }

      }

    }

  ]

};

    }

  }

}
