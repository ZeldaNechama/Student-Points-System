import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadingFileComponent } from './downloading-file.component';

describe('DownloadingFileComponent', () => {
  let component: DownloadingFileComponent;
  let fixture: ComponentFixture<DownloadingFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadingFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadingFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
