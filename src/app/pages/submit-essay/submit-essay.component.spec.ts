import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitEssayComponent } from './submit-essay.component';

describe('SubmitEssayComponent', () => {
  let component: SubmitEssayComponent;
  let fixture: ComponentFixture<SubmitEssayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitEssayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
