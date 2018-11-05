import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDoughnutComponent } from './charts-doughnut.component';

describe('ChartsDoughnutComponent', () => {
  let component: ChartsDoughnutComponent;
  let fixture: ComponentFixture<ChartsDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
