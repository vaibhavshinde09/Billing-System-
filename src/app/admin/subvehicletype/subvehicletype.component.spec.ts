import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubvehicletypeComponent } from './subvehicletype.component';

describe('SubvehicletypeComponent', () => {
  let component: SubvehicletypeComponent;
  let fixture: ComponentFixture<SubvehicletypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubvehicletypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubvehicletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
