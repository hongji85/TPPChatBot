import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { SocketService, Message } from '../../Services/socket.service';

@Component({
  selector: 'app-customer-chat-dialog',
  templateUrl: './customer-chat-dialog.component.html',
  styleUrls: ['./customer-chat-dialog.component.css']
})
export class CustomerChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public socket: SocketService) { }

  ngOnInit() {
    this.socket.initSocket();
    // appends to array after each new message is added to feedSource
    this.messages = this.socket.customer_conversation.asObservable().pipe(
      scan((acc, val) =>  { 
        return acc.concat(val) }));
  }

  sendMessage() {
    this.socket.sendCustomerMessage(this.formValue);
    this.formValue = '';
  }

}
