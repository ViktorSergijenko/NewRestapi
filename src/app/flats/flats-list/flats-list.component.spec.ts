import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsListComponent } from './flats-list.component';

describe('FlatsListComponent', () => {
  let component: FlatsListComponent;
  let fixture: ComponentFixture<FlatsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
