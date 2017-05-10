import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserlandingComponent } from './newuserlanding.component';

describe('NewuserlandingComponent', () => {
  let component: NewuserlandingComponent;
  let fixture: ComponentFixture<NewuserlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
