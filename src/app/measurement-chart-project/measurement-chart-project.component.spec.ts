import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementChartComponent } from './measurement-chart-project.component';

describe('MeasurementChartProjectComponent', () => {
  let component: MeasurementChartComponent;
  let fixture: ComponentFixture<MeasurementChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
