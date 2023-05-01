import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartNoUserComponent } from './shopping-cart-no-user.component';

describe('ShoppingCartNoUserComponent', () => {
  let component: ShoppingCartNoUserComponent;
  let fixture: ComponentFixture<ShoppingCartNoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartNoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartNoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
