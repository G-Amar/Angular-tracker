import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
   clients: Client[] = [];
   totalOwed!: number;
  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients: any) => {
      this.clients = clients;
      this.totalOwed = this.getTotal();
    });
  }

  getTotal() {
    return this.clients.reduce((acc, client) => {
      return acc + (client.balance ? client.balance : 0);
    }, 0);
  }
}
