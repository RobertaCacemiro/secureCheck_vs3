import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  /* create_NewLocation : Cria um novo registro na coleção especificada usando o método add */
  create_NewLocation(data: any): Promise<any> {
    return this.firestore.collection('Locations').add(data);
  }


  // /* read_Locations: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
  // read_Locations() {
  //   return this.firestore.collection('Locations').snapshotChanges();
  // }
  // /* update_Location : atualiza o registro pegando o ID e chamando o método de atualização */
  // update_Location(recordId, record) {
  //   this.firestore.doc('Locations/' + recordId).update(record);
  // }
  // /* delete_Location : chama o método de exclusão  ao registrar o ID*/
  // delete_Location(recordId) {
  //   this.firestore.doc('Locations/' + recordId).delete();
  // }
}