import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutentificacaoService } from 'src/app/services/autentificacao.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  selectedSegment: string = 'login';
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'danger';

  constructor(
    private fb: FormBuilder,
    private authService: AutentificacaoService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async fazerLogin() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      const success = await this.authService.login(user);
      if (success) {
        this.navCtrl.navigateForward('/home');
      } else {
        this.showToastMessage('Falha ao relaizar login', 'danger');
      }
    } else {
      this.showToastMessage('Formulário de login inválido', 'danger');
    }
  }

  async fazerCadastro() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      if (user.password === this.registerForm.value.confirmPassword) {
        const success = await this.authService.register(user);
        if (success) {
          this.navCtrl.navigateForward('/home');
        } else {
          this.showToastMessage('Falha ao realizar registro', 'danger');
        }
      } else {
        this.showToastMessage('As senhas não coincidem', 'danger');
      }
    } else {
      this.showToastMessage('Formulário de registro inválido', 'danger');
    }
  }

  async loginComGoogle() {
    const success = await this.authService.loginWithGoogle();
    if (success) {
      this.navCtrl.navigateForward('/home');
    } else {
      this.showToastMessage('Falha no login com Google', 'danger');
    }
  }

  updateSwiperContent(index: number) {
    this.selectedSegment = index === 1 ? 'login' : 'cadastro';
  }

  private showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
