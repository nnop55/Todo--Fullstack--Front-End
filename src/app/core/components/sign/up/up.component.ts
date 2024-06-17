import { Component, inject, output } from '@angular/core';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { RegisterForm, ResponseStatus } from '../../../../shared/utils/unions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { regex } from '../../../../shared/utils/regex';
import { ValidationDirective } from '../../../../shared/directives/validation.directive';
import { passwordMatchValidator } from '../../../../shared/utils/passwordmatch.validator';

@Component({
  selector: 'app-up',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, ValidationDirective],
  templateUrl: './up.component.html',
  styleUrl: './up.component.scss'
})
export class UpComponent {
  private authService = inject(AuthService);
  switchToLogin = output<void>()
  errorTxt!: string;
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = new FormGroup<RegisterForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      nickname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    }, { validators: passwordMatchValidator })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return
    }
    const postData = {
      email: this.f['email']?.value,
      nickname: this.f['nickname']?.value,
      password: this.f['password']?.value
    }
    console.log(postData)
    this.authService.register(postData)
      .subscribe({
        next: (response) => {
          if (response.code === ResponseStatus.Success) {
            this.switchToLogin.emit()
          }
          this.errorTxt = ''
        },
        error: (err) => {
          this.errorTxt = err.error.error
        }
      })
  }
}
