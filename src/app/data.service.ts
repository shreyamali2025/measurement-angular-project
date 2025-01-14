import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dropdownData: any = {};

  constructor(private http: HttpClient) {}

  getDropdownData(): Observable<any> {
    return this.http.get('/api/dropdown');
  }

  fetchAndStoreDropdownData(): void {
    this.getDropdownData().subscribe((data) => {
      console.log('Fetched Dropdown Data:', data);
      this.dropdownData = data;
    });
  }

  getFilteredDataWithTime(
    assetId: string,
    measId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.http.get('/api/data', {
      params: {
        asset_id: assetId,
        meas_id: measId,
        start_date: startDate,
        end_date: endDate,
      },
    });
  }
}
