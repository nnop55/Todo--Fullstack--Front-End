import { Component, inject } from '@angular/core';
import { Sign } from '../../../shared/utils/unions';
import { ActivatedRoute } from '@angular/router';
import { UpComponent } from './up/up.component';
import { InComponent } from './in/in.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [InComponent, UpComponent, NgClass],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent {

  route: ActivatedRoute = inject(ActivatedRoute)
  mode: Sign = Sign.In
  Sign = Sign
  animate: boolean = false;

  startAnimation() {
    this.animate = true;
    setTimeout(() => {
      this.handle75Percent();
    }, 1750);
  }

  handle75Percent() {
    this.mode =
      this.mode === Sign.In ? Sign.Up : Sign.In
  }

  onAnimationEnd(event: AnimationEvent) {
    console.log(event)
    this.animate = false;

  }
}
