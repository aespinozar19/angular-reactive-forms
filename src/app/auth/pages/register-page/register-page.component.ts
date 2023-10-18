import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ],
      [ new EmailValidatorService() ] ],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ],
    //   [ this.emailValidator ] ],
    username: ['', [ Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService,
 ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  isValidField( field:string ) {
    // TODO: Obtener validación desde un servicio
    return this.validatorService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
