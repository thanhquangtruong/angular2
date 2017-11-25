import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessclassComponent } from './businessclass.component';

describe('BusinessclassComponent', () => {
  let component: BusinessclassComponent;
  let fixture: ComponentFixture<BusinessclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
