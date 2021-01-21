import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurtiComponent } from './kurti.component';

describe('KurtiComponent', () => {
  let component: KurtiComponent;
  let fixture: ComponentFixture<KurtiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurtiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
