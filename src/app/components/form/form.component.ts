import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/clientes/shared/cliente';
import { DbService } from 'src/app/services/db.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  formCliente!: FormGroup;

  constructor(private viacepService: ViacepService, private db: DbService) {

   }

  ngOnInit(): void {  
    this.createForm(new Cliente());
  }

  createForm(clienteData: Cliente) {
    this.formCliente = new FormGroup({
      name: new FormControl(clienteData.name),
      email: new FormControl(clienteData.email),
      cpf: new FormControl(clienteData.cpf),
      birthday: new FormControl(clienteData.birthday),
      zipCode: new FormControl(clienteData.zipCode),
      street: new FormControl(clienteData.street),
      number: new FormControl(clienteData.number),
      district: new FormControl(clienteData.district),
      complement: new FormControl(clienteData.complement)
    })
  }

  onSubmit() {
    this.db.postCustomer(this.formCliente.value).subscribe(response => console.log(response)
    )
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
