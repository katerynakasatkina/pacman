import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoralgorithmComponent } from './algoralgorithm.component';

describe('AlgoralgorithmComponent', () => {
  let component: AlgoralgorithmComponent;
  let fixture: ComponentFixture<AlgoralgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoralgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoralgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
