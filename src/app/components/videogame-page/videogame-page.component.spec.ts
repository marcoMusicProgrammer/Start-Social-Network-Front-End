import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamePageComponent } from './videogame-page.component';

describe('VideogamePageComponent', () => {
  let component: VideogamePageComponent;
  let fixture: ComponentFixture<VideogamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
