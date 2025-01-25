import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersPostsComponent } from './other-users-posts.component';

describe('OtherUsersPostsComponent', () => {
  let component: OtherUsersPostsComponent;
  let fixture: ComponentFixture<OtherUsersPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherUsersPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUsersPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
