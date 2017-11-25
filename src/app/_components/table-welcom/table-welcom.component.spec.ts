import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWelcomComponent } from './table-welcom.component';

describe('TableWelcomComponent', () => {
  let component: TableWelcomComponent;
  let fixture: ComponentFixture<TableWelcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWelcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWelcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
