import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChatDialogComponent } from './customer-chat-dialog.component';

describe('CustomerChatDialogComponent', () => {
  let component: CustomerChatDialogComponent;
  let fixture: ComponentFixture<CustomerChatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
