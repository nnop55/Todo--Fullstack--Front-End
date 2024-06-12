import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('flipState', [
      state('login', style({ transform: 'rotateY(0)' })),
      state('register', style({ transform: 'rotateY(180deg)' })),
      transition('login => register', [
        group([
          query('@flipIn, @flipOut', [animateChild()], { optional: true }),
          animate('600ms ease')
        ])
      ]),
      transition('register => login', [
        group([
          query('@flipIn, @flipOut', [animateChild()], { optional: true }),
          animate('600ms ease')
        ])
      ])
    ]),
    trigger('flipIn', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)', opacity: 0 }),
        animate('600ms ease', style({ transform: 'rotateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('flipOut', [
      transition(':leave', [
        animate('600ms ease', style({ transform: 'rotateY(180deg)', opacity: 0 }))
      ])
    ])
  ]
})
export class AuthComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode: boolean = true;

  private fb: FormBuilder = inject(FormBuilder)
  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error(err)
    });
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const { nickname, email, password } = this.registerForm.value;
    this.authService.register({
      nickname, email, password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error(err)
    });
  }
}
