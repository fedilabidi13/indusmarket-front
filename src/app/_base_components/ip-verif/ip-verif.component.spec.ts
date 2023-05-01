import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpVerifComponent } from './ip-verif.component';

describe('IpVerifComponent', () => {
  let component: IpVerifComponent;
  let fixture: ComponentFixture<IpVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpVerifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
