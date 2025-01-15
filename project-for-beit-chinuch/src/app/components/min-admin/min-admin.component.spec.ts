import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinAdminComponent } from './min-admin.component';

describe('MinAdminComponent', () => {
  let component: MinAdminComponent;
  let fixture: ComponentFixture<MinAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
