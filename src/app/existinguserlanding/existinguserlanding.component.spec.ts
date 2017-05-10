import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistinguserlandingComponent } from './existinguserlanding.component';

describe('ExistinguserlandingComponent', () => {
  let component: ExistinguserlandingComponent;
  let fixture: ComponentFixture<ExistinguserlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistinguserlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistinguserlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
