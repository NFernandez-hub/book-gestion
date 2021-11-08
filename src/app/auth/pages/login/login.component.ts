import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .login100-form{
      max-width: 400px;      
    };
  `]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: [
      'nicolasfernandez2701@gmail.com',
      [Validators.required, Validators.email]
    ],
    password: [
      '123456',
      [Validators.required, Validators.minLength(6)]
    ]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  login() {

    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password)
      .subscribe(ok => {

        if (ok === true) {
          this.router.navigateByUrl('/gestion/autor');
        } else {
          Swal.fire('Error', ok, 'error')
        }

      });
  }

}
