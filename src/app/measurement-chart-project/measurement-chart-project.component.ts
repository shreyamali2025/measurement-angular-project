import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-measurement-chart-project',
  templateUrl: './measurement-chart-project.component.html',
  styleUrls: ['./measurement-chart-project.component.css'],
})
export class MeasurementChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Measurement Chart',
    },
    xAxis: {
      categories: [],
    },
    series: [
      {
        type: 'line',
        data: [],
      },
    ],
  };

  selectedAssetId: string = '';
  selectedMeasId: string = '';
  assetIds: string[] = [];
  filteredMeasIds: string[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchAndStoreDropdownData();
    this.dataService.getDropdownData().subscribe((data: any) => {
      console.log('Dropdown Data:', data);
      this.assetIds = Object.keys(data);
    });
  }  

  onAssetChange(): void {
    const dropdownData = this.dataService.dropdownData;
    this.filteredMeasIds = dropdownData[this.selectedAssetId] || [];
    console.log('Filtered Measurement IDs:', this.filteredMeasIds);
    if (this.filteredMeasIds.length > 0) {
      this.selectedMeasId = this.filteredMeasIds[0];
      console.log('Selected Measurement ID:', this.selectedMeasId);
    }
  }

  onFilterChange(): void {
    const formattedStartDate = `${this.startDate}T00:00:00Z`;
    const formattedEndDate = `${this.endDate}T23:59:59Z`;

    this.dataService
      .getFilteredDataWithTime(
        this.selectedAssetId,
        this.selectedMeasId,
        formattedStartDate,
        formattedEndDate
      )
      .subscribe((data: any) => {
        console.log('Filtered Data:', data);

        if (data.length === 0) {
          alert('No data found for the selected filters.');
          (this.chartOptions.series![0] as Highcharts.SeriesLineOptions).data =
            [];
          Highcharts.chart('container', this.chartOptions);
          return;
        }

        const categories = data.map((item: any) =>
          new Date(item.record_timestamp).toLocaleString()
        );
        const values = data.map((item: any) => item.measurement_value);

        console.log('Categories:', categories);
        console.log('Values:', values);

        (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories =
          categories;
        (this.chartOptions.series![0] as Highcharts.SeriesLineOptions).data =
          values;

        Highcharts.chart('container', this.chartOptions);
      });
  }
}
