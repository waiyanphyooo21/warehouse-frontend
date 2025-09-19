import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButonDemo } from './buton-demo';

describe('ButonDemo', () => {
  let component: ButonDemo;
  let fixture: ComponentFixture<ButonDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButonDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButonDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
