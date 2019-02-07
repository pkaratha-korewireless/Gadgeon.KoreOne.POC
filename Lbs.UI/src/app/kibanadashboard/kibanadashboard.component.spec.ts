import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KibanadashboardComponent } from './kibanadashboard.component';

describe('KibanadashboardComponent', () => {
  let component: KibanadashboardComponent;
  let fixture: ComponentFixture<KibanadashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KibanadashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KibanadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
