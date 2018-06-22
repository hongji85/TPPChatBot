import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { SocketService, Message, OperatorMessage, CustomerObject } from '../../Services/socket.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  operatorMessages: Observable<OperatorMessage[]>;
  customers: Observable<CustomerObject[]>;
  formValue: string;
  infoMessage: Observable<string>;
  customerObjects: CustomerObject[] = [];
  currentCustomerObject: CustomerObject;

  constructor(public socket: SocketService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.socket.initSocket();
    // appends to array after each new message is added to feedSource
    this.operatorMessages = this.socket.operator_conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));
    this.customers = this.socket.customer_list.asObservable().pipe(scan((acc, val) => { 
      this.customerObjects.push(val[0]);
      return acc.concat(val) 
    }));
    this.socket.info_message.asObservable().subscribe({
      next: x => this.flashMessage.show(x, {cssClass: 'alert-success', timeout: 3000})
    });
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.currentCustomerObject = this.customerObjects[tabChangeEvent.index];
  }

  sendMessage() {
    this.socket.sendOperatorMessage(this.currentCustomerObject, this.formValue);
    this.formValue = '';
  }
}
