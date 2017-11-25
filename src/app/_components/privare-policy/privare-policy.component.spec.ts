import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivarePolicyComponent } from './privare-policy.component';

describe('PrivarePolicyComponent', () => {
  let component: PrivarePolicyComponent;
  let fixture: ComponentFixture<PrivarePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivarePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivarePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
