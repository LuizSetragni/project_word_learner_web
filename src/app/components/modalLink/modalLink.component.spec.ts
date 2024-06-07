import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkComponent } from './modalLink.component';

describe('ModalLinkComponent', () => {
  let component: ModalLinkComponent;
  let fixture: ComponentFixture<ModalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
