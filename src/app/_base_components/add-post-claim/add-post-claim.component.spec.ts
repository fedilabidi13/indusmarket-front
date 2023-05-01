import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostClaimComponent } from './add-post-claim.component';

describe('AddPostClaimComponent', () => {
  let component: AddPostClaimComponent;
  let fixture: ComponentFixture<AddPostClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
