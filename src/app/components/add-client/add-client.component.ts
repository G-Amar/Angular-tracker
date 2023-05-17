import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

import { Client } from 'src/app/models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalance: boolean = true;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.disableBalance = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean|null}) {
    if(this.disableBalance){
      value.balance = 0;
    }

    if(!valid) {
      alert('Form is invalid');
    } else {
      this.clientService.addClient(value);
      alert('Client Added');
      this.router.navigate(['/']); //go back to dash
    }
  }
}
