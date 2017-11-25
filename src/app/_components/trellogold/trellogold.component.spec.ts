import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrellogoldComponent } from './trellogold.component';

describe('TrellogoldComponent', () => {
  let component: TrellogoldComponent;
  let fixture: ComponentFixture<TrellogoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrellogoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrellogoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
