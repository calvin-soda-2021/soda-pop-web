import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDashboardRowComponent } from './stock-dashboard-row.component';

describe('StockDashboardRowComponent', () => {
  let component: StockDashboardRowComponent;
  let fixture: ComponentFixture<StockDashboardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDashboardRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDashboardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
