import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationsService } from 'src/app/services/locations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;
  endereco: any = {};

  constructor(private LocationsService: LocationsService, private http: HttpClient) {
    this.registerForm = new FormGroup({
      identificacao: new FormControl(''),
      alarme: new FormControl(''),
      cep: new FormControl(''),
      bairro: new FormControl(''),
      logradouro: new FormControl('')
    });


    this.registerForm.get('cep')!.valueChanges.subscribe(value => {
      if (!value.trim()) {
        this.registerForm.patchValue({
          bairro: '',
          logradouro: ''
        });
      }
    });
  }

  buscarEndereco() {
    const cep = this.registerForm.get('cep')!.value;

    if (/^\d{5}-?\d{3}$/.test(cep)) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        this.endereco = data;
        this.registerForm.patchValue({
          bairro: data.bairro,
          logradouro: data.logradouro
        });
      });
    }
  }

  submit() {
    if (this.registerForm.valid) {
      this.LocationsService.create_NewLocation(this.registerForm.value)
        .then(() => {
          console.log('Dados do formulário salvos com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao salvar os dados do formulário:', error);
        });
    } else {
      console.error('Formulário inválido!');
    }
  }

  clearForm() {
    this.registerForm.reset();
  }

}
