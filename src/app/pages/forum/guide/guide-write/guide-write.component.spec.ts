import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideWriteComponent } from './guide-wirte.component';



describe('GuideWriteComponent', () => {
  let component: GuideWriteComponent;
  let fixture: ComponentFixture<GuideWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
