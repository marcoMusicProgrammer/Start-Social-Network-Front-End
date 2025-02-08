import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogameStarsComponent } from './videogame-stars.component';

describe('VideogameStarsComponent', () => {
  let component: VideogameStarsComponent;
  let fixture: ComponentFixture<VideogameStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogameStarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogameStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
