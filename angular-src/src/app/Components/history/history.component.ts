import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryService } from '../../Services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  customers: Observable<string[]>;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getCustomers().subscribe(data => {
      if (data.success) {
        this.customers = data.customers;
        
      } else {
        console.log('Failed to load customer list');
      }
    });
  }

}
