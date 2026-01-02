import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyfoodLabelComponent } from './anyfood-label.component';

describe('LabelComponent', () => {
  let component: AnyfoodLabelComponent;
  let fixture: ComponentFixture<AnyfoodLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyfoodLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnyfoodLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
