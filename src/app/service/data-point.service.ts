import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPointService {
  private readonly url = 'http://localhost:3000/api/data?asset_id=HMI_MEASUREMENT&meas_id=PPCShutDown&start_date=2025-01-08&end_date=2025-01-08';
  
  constructor(private http: HttpClient) { }

  getDropdownData() {
    return this.http.get(this.url).pipe(
      map((data: any) => {
        console.log('Dropdown Data:', data);
        return data;
      })
    );
  }
}
