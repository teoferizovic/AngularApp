import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsOverviewComponent } from './category-details-overview.component';

describe('CategoryDetailsOverviewComponent', () => {
  let component: CategoryDetailsOverviewComponent;
  let fixture: ComponentFixture<CategoryDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
