import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewComponent } from './blog-overview.component';

describe('BlogOverviewComponent', () => {
  // let component: BlogOverviewComponent;
  let fixture: ComponentFixture<BlogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogOverviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlogOverviewComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passes', () => {
    expect().nothing();
  });
});
