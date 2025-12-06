import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSubscriptionComponent } from './users-subscription.component';

describe('UsersSubscriptionComponent', () => {
  let component: UsersSubscriptionComponent;
  let fixture: ComponentFixture<UsersSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
