import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskEmiComponent } from './ask-emi.component';

describe('AskEmiComponent', () => {
  let component: AskEmiComponent;
  let fixture: ComponentFixture<AskEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskEmiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
