import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyfoodInputComponent } from './anyfood-input.component';

describe('AnyfoodInputComponent', () => {
  let component: AnyfoodInputComponent;
  let fixture: ComponentFixture<AnyfoodInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyfoodInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnyfoodInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
