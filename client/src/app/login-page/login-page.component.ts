import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription //утечка памяти

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        MaterialService.toast('You can use your input data for login')
        // You can use your input data for login
      } else if (params['accesDenied']) {
        MaterialService.toast('For login you must be authorized')
        // For login you must be authorized
      } else if (params['sessionFailed']) {
        MaterialService.toast('Plese, login again. Thanks!')
      }
    }) 
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    
  }

  onSubmit() {
    // const user = {
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // } 
    // this.form.value уже является наш user, поэтому не надо создавать новый объект
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']), // !!!!! дописать redirect !!!!
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      } 
    )
  }

}
