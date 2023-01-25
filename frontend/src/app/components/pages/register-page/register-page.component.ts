import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { passwordMatchValidator } from 'src/app/shared/validators/password_Match_Validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  returnUrl: string = '';
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private activactedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.registerForm =this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activactedRoute.snapshot.queryParams.returnUrl;
  }

  // fc Form Controls
  get fc(){
  return this.registerForm.controls;
  }

  submit(){
    if(this.registerForm.invalid){
      return;
    }else{
      // fv Form Value
      const fv = this.registerForm.value;
      const user: IUserRegister = {
        name: fv.name,
        email: fv.email,
        password: fv.password,
        confirmPassword: fv.confirmPassword
      }
      this.userService.register(user)
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
  }

}
