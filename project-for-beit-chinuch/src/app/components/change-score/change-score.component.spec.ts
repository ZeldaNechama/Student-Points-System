import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScoreComponent } from './change-score.component';

describe('ChangeScoreComponent', () => {
  let component: ChangeScoreComponent;
  let fixture: ComponentFixture<ChangeScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
