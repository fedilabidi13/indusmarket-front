import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModsDashboardComponent } from './mods-dashboard.component';

describe('ModsDashboardComponent', () => {
  let component: ModsDashboardComponent;
  let fixture: ComponentFixture<ModsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
