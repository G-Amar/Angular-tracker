import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

import { Client } from '../models/Client';

//rmbr: this is a service, it will be used by our components to do stuff to our data
// this will handle all the operations on our data, i presume

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection!: AngularFirestoreCollection<Client>;
  clientDoc!: AngularFirestoreDocument<Client>;
  clients!: Observable<Client[]>;
  client!: Observable<Client | null>;

  constructor(private afs: AngularFirestore) { //firestore reference, also acts as dependency injections
    this.clientsCollection = this.afs.collection("clients", ref => ref.orderBy('firstName', 'asc')) //get the clients collection from firestore
  }

  getClients(): Observable<Client[]> {
    //get clients with id, use snapshotChanges() to get ids
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((action: any) => {
          const data = action.payload.doc.data() as Client; //cast to Client
          data.id = action.payload.doc.id;
          return data; 
          
          //essentially, we got the data and included the id with it as well
      });
    }));
    return this.clients;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client | null> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map((action: any) => {
      if(action.payload.exists === false){
        return null;
      } else {
        const data = action.payload.data() as Client; //cast to Client
        data.id = action.payload.id;
        return data; 
      }
    }));

    return this.client;
  }

  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client| null) {
    if(client){
      this.clientDoc = this.afs.doc(`clients/${client.id}`);
      this.clientDoc.delete();
    }
  }
}
