import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrangerUserProfilePageComponent } from './stranger-user-profile-page.component';

describe('StrangerUserProfilePageComponent', () => {
  let component: StrangerUserProfilePageComponent;
  let fixture: ComponentFixture<StrangerUserProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrangerUserProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrangerUserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
