import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Importar o Firebase

@Injectable({
  providedIn: 'root'
})
export class AutentificacaoService {

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController
  ) { }

  async login(user: User): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      return !!result.user;
    } catch (error) {
      console.error('Erro durante o login:', error);
      return false;
    }
  }

  async register(user: User): Promise<boolean> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      console.log('Usuário registrado com sucesso:', result);
      return true;
    } catch (error) {
      console.error('Erro durante o registro:', error);
      return false;
    }
  }

  async loginWithGoogle(): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return !!result.user;
    } catch (error) {
      console.error('Erro durante o login com Google:', error);
      return false;
    }
  }
}
