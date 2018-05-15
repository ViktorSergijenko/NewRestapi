import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsComponent } from './flats.component';

describe('FlatsComponent', () => {
  let component: FlatsComponent;
  let fixture: ComponentFixture<FlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
