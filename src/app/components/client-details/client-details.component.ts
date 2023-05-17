import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit{
  id!: string;
  client!: Client | null;
  hasBalance: boolean = false; 
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get the id (from URL)
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client?.balance && client.balance > 0){
        this.hasBalance = true;
      }

      this.client = client;
    })
  }

  onDeleteClick() {
    if(confirm(`Are you sure you want to delete ${this.client?.firstName} ${this.client?.lastName}?`)){
      this.clientService.deleteClient(this.client);
      alert(`${this.client?.firstName} ${this.client?.lastName} deleted successfully!`);
      this.router.navigate(['/']); //go back to dashboard
    }

  }

  updateBalance(){
    if(this.client){
      this.clientService.updateClient(this.client);
      alert("Balance saved!");
    }
  }
}
