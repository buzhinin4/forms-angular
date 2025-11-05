import { Component, inject, Signal, signal } from '@angular/core';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-aside-menu',
  imports: [],
  templateUrl: './aside-menu.html',
  styleUrl: './aside-menu.css',
})
export class AsideMenu {
  fs = inject(FormService);
  protected maxStep: Signal<number> = this.fs.maxStep;

  goToStep(stepNumber: number) {
    if (this.maxStep() >= stepNumber) {
      this.fs.setStep(stepNumber);
      this.fs.navigate();
    } else {
      alert('You have not yet reached the desired part, go through the previous parts of the form');
    }
  }
}
