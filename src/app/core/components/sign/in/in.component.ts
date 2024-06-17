import { Component, inject } from '@angular/core';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { regex } from '../../../../shared/utils/regex';
import { LoginForm } from '../../../../shared/utils/unions';
import { ValidationDirective } from '../../../../shared/directives/validation.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-in',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, ValidationDirective],
  templateUrl: './in.component.html',
  styleUrl: './in.component.scss'
})
export class InComponent {

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  errorTxt!: string;
  returnUrl!: string;
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm()

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initForm() {
    this.form = new FormGroup<LoginForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return
    }
    this.authService.login(form.value).subscribe({
      next: () => {
        this.errorTxt = '';
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.errorTxt = err.error.error
      }
    })
  }

}
