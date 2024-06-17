import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() className: string = '';
  @Input() inpType: string = 'text';

  private _innerValue: any;

  private onChangeCallback: (_: any) => void = () => { };
  private onTouchedCallback: () => void = () => { };

  writeValue(value: any): void {
    if (value !== this._innerValue) {
      this._innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void { }

  get innerValue(): any {
    return this._innerValue;
  }

  set innerValue(value: any) {
    if (value !== this._innerValue) {
      this._innerValue = value;
      this.onChangeCallback(this._innerValue);
    }
  }

  onInputChange(event: any): void {
    this.innerValue = event.target.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }
}
