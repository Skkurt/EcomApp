import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessPopUpComponent } from './sucess-pop-up.component';

describe('SucessPopUpComponent', () => {
  let component: SucessPopUpComponent;
  let fixture: ComponentFixture<SucessPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessPopUpComponent]
    });
    fixture = TestBed.createComponent(SucessPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
