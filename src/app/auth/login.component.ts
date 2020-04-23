import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

// const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          // log.debug(`${credentials.email} successfully logged in`);
          console.log(`${credentials.email} successfully logged in`);

          this.router.navigate([this.route.snapshot.queryParams.redirect || '/admin-panel'], { replaceUrl: true });
        },
        (error) => {
          // log.debug(`Login error: ${error}`);
          console.log(`Login error: ${error}`);

          this.error = error;
          this.loginForm.reset();
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('admin2594@gmail.com', { validators: [Validators.required] }),
      password: new FormControl('Admin223', { validators: [Validators.required] }),
      // username: ['', Validators.required],
      // password: ['', Validators.required],
    });
  }
}
