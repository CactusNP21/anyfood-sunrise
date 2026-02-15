import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyfoodSelectionComponent } from './anyfood-selection.component';

describe('AnyfoodSelectionComponent', () => {
  let component: AnyfoodSelectionComponent;
  let fixture: ComponentFixture<AnyfoodSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyfoodSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnyfoodSelectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
