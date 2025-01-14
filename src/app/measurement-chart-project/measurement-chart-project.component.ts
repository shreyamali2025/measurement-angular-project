import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataPointService } from '../service/data-point.service';

@Component({
  selector: 'app-measurement-chart-project',
  templateUrl: './measurement-chart-project.component.html',
  styleUrls: ['./measurement-chart-project.component.css'],
})
export class MeasurementChartComponent implements OnInit {
  dropdownData: any = {};
  assetIds: string[] = [];
  filteredMeasIds: string[] = [];
  selectedAssetId = '';
  selectedMeasId = '';
  startDate = '';
  endDate = '';
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: 'Measurements' },
    xAxis: { categories: [] },
    yAxis: { title: { text: 'Measurement Values' } },
    series: [{ type: 'line', name: 'Measurement Data', data: [] }],
  };

  constructor(private dataPointService: DataPointService) {}

  ngOnInit(): void {
    this.dataPointService.getDropdownData().subscribe((data) => {
      this.dropdownData = data;
      this.assetIds = Object.keys(data);
    });
  }

  onAssetChange(): void {
    this.filteredMeasIds = this.dropdownData[this.selectedAssetId] || [];
    this.selectedMeasId = this.filteredMeasIds[0] || '';
  }

  onFilterChange(): void {
    const params = {
      asset_id: this.selectedAssetId,
      meas_id: this.selectedMeasId,
      start_date: `${this.startDate}T00:00:00Z`,
      end_date: `${this.endDate}T23:59:59Z`,
    };

    this.dataPointService.getFilteredData(params).subscribe((data: any) => {
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

      (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories =
        categories;
      (this.chartOptions.series![0] as Highcharts.SeriesLineOptions).data =
        values;

      Highcharts.chart('container', this.chartOptions);
    });
  }
}
