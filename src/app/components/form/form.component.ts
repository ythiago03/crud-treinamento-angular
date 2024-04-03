import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/clientes/shared/cliente';
import { DbService } from 'src/app/services/db.service';
import { ViacepService } from 'src/app/services/viacep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  formCliente!: FormGroup;
  formSubmited: boolean = false;

  constructor(private viacepService: ViacepService, private db: DbService, private router: Router) {

   }

  ngOnInit(): void {  
    this.createForm(new Cliente());
  }

  createForm(clienteData: Cliente) {
    this.formCliente = new FormGroup({
      name: new FormControl(clienteData.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: new FormControl(clienteData.email, [
        Validators.required,
        Validators.email
      ]),
      cpf: new FormControl(clienteData.cpf, [
        Validators.required,
        Validators.min(11)
      ]),
      birthday: new FormControl(clienteData.birthday, [
        Validators.required
      ]),
      zipCode: new FormControl(clienteData.zipCode, [
        Validators.required
      ]),
      street: new FormControl(clienteData.street, [
        Validators.required
      ]),
      number: new FormControl(clienteData.number, [
        Validators.required
      ]),
      district: new FormControl(clienteData.district, [
        Validators.required
      ]),
      complement: new FormControl(clienteData.complement)
    }) 
  }


  onSubmit() {
    console.log(this.formCliente.value);
    console.log(this.formCliente.valid);
    if(this.formCliente.valid){
      console.log(this.formCliente.value);
      //this.db.postCustomer(this.formCliente.value).subscribe(response => console.log(response))
      this.router.navigate(['/search'])
      return;
    }
    this.formSubmited = true
  }

  getAddress(event: any){
    const cep = event.target.value
    this.viacepService.getAddress(cep).subscribe(response => {
      this.preencherEndereco(response)
    })
  }

  preencherEndereco(response: any){ 
    this.formCliente.get('street')?.setValue(response.logradouro);
    this.formCliente.get('district')?.setValue(response.bairro);
  }

}
