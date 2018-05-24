import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DllComponentComponent } from './dll-component.component';

describe('DllComponentComponent', () => {
  let component: DllComponentComponent;
  let fixture: ComponentFixture<DllComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DllComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DllComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
