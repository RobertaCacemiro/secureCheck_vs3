import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  /* create_NewLocation : Cria um novo registro na coleção especificada usando o método add */
  create_NewLocation(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          data.userId = user.uid; // Adiciona o ID do usuário aos dados
          this.firestore.collection('Locations').add(data)
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
          reject('Usuário não autenticado');
        }
      }).catch(err => reject(err));
    });
  }


  read_Locations() {
    return new Promise<any[]>((resolve, reject) => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          this.firestore.collection('Locations', ref => ref.where('userId', '==', user.uid))
            .snapshotChanges()
            .subscribe((locations) => {
              const data = locations.map(location => {
                const id = location.payload.doc.id;
                const docData = location.payload.doc.data();
                return { id, ...Object.assign({}, docData) }; // Modificação aqui
              });
              resolve(data);
            });
        } else {
          reject('Usuário não autenticado');
        }
      }).catch(err => reject(err));
    });
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