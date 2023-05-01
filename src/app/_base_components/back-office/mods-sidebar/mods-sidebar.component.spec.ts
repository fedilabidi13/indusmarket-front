import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModsSidebarComponent } from './mods-sidebar.component';

describe('ModsSidebarComponent', () => {
  let component: ModsSidebarComponent;
  let fixture: ComponentFixture<ModsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModsSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
