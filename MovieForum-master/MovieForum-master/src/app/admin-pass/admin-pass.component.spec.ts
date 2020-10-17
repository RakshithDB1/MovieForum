import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPassComponent } from './admin-pass.component';

describe('AdminPassComponent', () => {
  let component: AdminPassComponent;
  let fixture: ComponentFixture<AdminPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
