import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModsConfirmComponent } from './mods-confirm.component';

describe('ModsConfirmComponent', () => {
  let component: ModsConfirmComponent;
  let fixture: ComponentFixture<ModsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModsConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
