import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedBoardComponent } from './reviewed-board.component';

describe('ReviewedBoardComponent', () => {
  let component: ReviewedBoardComponent;
  let fixture: ComponentFixture<ReviewedBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewedBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
