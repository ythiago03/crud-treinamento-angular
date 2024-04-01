import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/clientes/shared/cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  formCliente!: FormGroup;

  constructor() { }

  ngOnInit(): void {  
    this.createForm(new Cliente());
  }

  createForm(clienteData: Cliente) {
    this.formCliente = new FormGroup({
      nome: new FormControl(clienteData.nome),
      email: new FormControl(clienteData.email),
      cpf: new FormControl(clienteData.cpf),
      dataNascimento: new FormControl(clienteData.dataNascimento),
      cep: new FormControl(clienteData.cep),
      logradouro: new FormControl(clienteData.logradouro),
      numeroCasa: new FormControl(clienteData.numeroCasa),
      bairro: new FormControl(clienteData.bairro),
      complemento: new FormControl(clienteData.complemento)
    })
  }

  onSubmit() {
    console.log(this.formCliente.value);
  }
}
