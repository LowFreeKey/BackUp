import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyboardComponent } from './skyboard.component';

describe('SkyboardComponent', () => {
  let component: SkyboardComponent;
  let fixture: ComponentFixture<SkyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
