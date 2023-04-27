import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvantModComponent } from './evant-mod.component';

describe('EvantModComponent', () => {
  let component: EvantModComponent;
  let fixture: ComponentFixture<EvantModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvantModComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvantModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
