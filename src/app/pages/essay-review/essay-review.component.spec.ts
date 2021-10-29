import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayReviewComponent } from './essay-review.component';

describe('EssayReviewComponent', () => {
  let component: EssayReviewComponent;
  let fixture: ComponentFixture<EssayReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
