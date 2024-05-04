import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWordLearnerComponent } from './login-word-learner.component';

describe('LoginWordLearnerComponent', () => {
  let component: LoginWordLearnerComponent;
  let fixture: ComponentFixture<LoginWordLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWordLearnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginWordLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
