import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id!: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = true;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    // get the id (from URL)
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client)
        this.client = client;
    })
  }

  onSubmit({value, valid}: {value: Client, valid: boolean|null}) {
    if(!valid){
      alert("Form not valid!");
    } else {
      //form doenst have id, have to add ourselves
      value.id = this.id;
      this.clientService.updateClient(value);

      alert("Update successful!");
      this.router.navigate([`/client/${this.id}`])
    }
  }

}
