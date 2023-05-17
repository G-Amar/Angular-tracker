import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }

  constructor() { 
    if(localStorage.getItem('settings')){
      this.settings = JSON.parse(localStorage.getItem('settings')!); //ensure not-null

    }
   }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
