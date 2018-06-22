import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Operator } from 'rxjs';
import * as socketIo from 'socket.io-client';

export class Message {
    constructor(public content: string, public sentBy: string) {}
}

export class MessageObject {
    constructor(public customerObject: CustomerObject, public utterance: string) {}
}

export class OperatorMessage {
    constructor(public customerId: string, public utterance: string, public isAgentResponse: boolean, public sentBy: string) {}
}

export class CustomerObject {
    constructor(public customerId: string, public customerName: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private customer_socket;
    private operator_socket;

    customer_conversation = new BehaviorSubject<Message[]>([]);
    operator_conversation = new BehaviorSubject<OperatorMessage[]>([]);
    customer_list = new BehaviorSubject<CustomerObject[]>([]);
    info_message = new BehaviorSubject<string>("");

    constructor() { }

    public initSocket(): void {
        this.customer_socket = socketIo('http://localhost:3000/customer');
        this.operator_socket = socketIo('http://localhost:3000/operator');

        this.customer_socket.on('customer message', (data: string) => {
            this.update_customer(new Message(data, 'agent'));
        });

        this.operator_socket.on('operator message', (data: OperatorMessage) => {
            this.update_operator(data.customerId, data.utterance, data.isAgentResponse, 'user');
        });
        this.operator_socket.on('customer message', (data: OperatorMessage) => {
            this.update_operator(data.customerId, data.utterance, data.isAgentResponse, data.isAgentResponse ? 'user' : 'agent');
        });
        this.operator_socket.on('customer connected', (data: any) => {
            this.update_operator_customerlist(data.customerId, data.customerName);
        });
        this.operator_socket.on('operator requested', (data: string) => {
            this.info_message.next("Operator requested!");
        });
        this.operator_socket.on('customer disconnected', (data: OperatorMessage) => {

        });
        this.operator_socket.on('system error', (data: OperatorMessage) => {
            
        });
    }

    public sendCustomerMessage(msg: string): void {
        const message = new Message(msg, 'user');
        this.customer_socket.emit('customer message', message.content);
        this.update_customer(message);
    }

    public sendOperatorMessage(customerObject: CustomerObject, msg: string): void {
        this.operator_socket.emit('operator message', new MessageObject(customerObject, msg));
    }

    // Adds message to source
    private update_customer(msg: Message): void {
        this.customer_conversation.next([msg]);
    }

    private update_operator(Id: string, utterance: string, isAgentResponse: boolean, sentBy: string): void {
        this.operator_conversation.next([new OperatorMessage(Id, utterance, isAgentResponse, sentBy)]);
    }

    private update_operator_customerlist(Id: string, Name: string): void {
        this.customer_list.next([new CustomerObject(Id, Name)]);
    }
}