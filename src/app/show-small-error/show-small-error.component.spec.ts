import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSmallErrorComponent } from './show-small-error.component';

describe('ShowSmallErrorComponent', () => {
  let component: ShowSmallErrorComponent;
  let fixture: ComponentFixture<ShowSmallErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSmallErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSmallErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
