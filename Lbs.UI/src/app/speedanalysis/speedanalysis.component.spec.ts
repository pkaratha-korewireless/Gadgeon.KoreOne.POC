import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedanalysisComponet } from './speedanalysis.component';

describe('SpeedanalysisComponet', () => {
  let component: SpeedanalysisComponet;
  let fixture: ComponentFixture<SpeedanalysisComponet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedanalysisComponet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedanalysisComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
