import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataPointService {
  private readonly dropdownUrl = 'http://localhost:3000/api/dropdown';
  private readonly dataUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) {}

  getDropdownData() {
    return this.http.get(this.dropdownUrl).pipe(
      map((data: any) => {
        console.log('Dropdown Data:', data);
        return data;
      })
    );
  }

  getFilteredData(params: any) {
    return this.http.get(this.dataUrl, { params }).pipe(
      map((data: any) => {
        console.log('Filtered Data:', data);
        return data;
      })
    );
  }
}
