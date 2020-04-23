import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMemeComponent } from './single-meme.component';

describe('SingleMemeComponent', () => {
  let component: SingleMemeComponent;
  let fixture: ComponentFixture<SingleMemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleMemeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
