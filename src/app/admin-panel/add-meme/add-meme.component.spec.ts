import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemeComponent } from './add-meme.component';

describe('AddMemeComponent', () => {
  let component: AddMemeComponent;
  let fixture: ComponentFixture<AddMemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
