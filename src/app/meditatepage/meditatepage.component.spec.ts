import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditatepageComponent } from './meditatepage.component';

describe('MeditatepageComponent', () => {
  let component: MeditatepageComponent;
  let fixture: ComponentFixture<MeditatepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditatepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditatepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
