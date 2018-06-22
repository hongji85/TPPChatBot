import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryService } from '../../Services/history.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatlog',
  templateUrl: './chatlog.component.html',
  styleUrls: ['./chatlog.component.css']
})
export class ChatlogComponent implements OnInit {
  chatlogs: Observable<Object[]>;

  constructor(private historyService: HistoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.historyService.getCustomerChatLog(params['customerId']).subscribe(logs => {
        if (logs.success) {
          this.chatlogs = logs.chatlogs;
        } else {
          console.log('Failed to load chat logs');
        }
      }, err => {
        console.log(err);
        return false;
      });
    });
  }

}
