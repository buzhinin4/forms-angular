import { computed, inject, Injectable, signal } from '@angular/core';
import { IBasicData } from '../../types/basic-data.interface';
import { IAdditionalData } from '../../types/additional-data.interface';
import { IConfirmData } from '../../types/confirm-data.inteface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private router = inject(Router);
  private stepSig = signal(1);
  currentStep = this.stepSig.asReadonly();

  private maxStepSig = signal(1);
  maxStep = this.maxStepSig.asReadonly();

  private updateMaxStep() {
    this.maxStepSig.update((m) => Math.max(m, this.currentStep()));
  }

  next() {
    this.stepSig.update((v) => v + 1);
    this.updateMaxStep();
    this.navigate();
  }

  navigate() {
    this.router.navigate([this.getStorageKey()]);
  }

  setStep(n: number) {
    this.stepSig.set(n);
  }

  save(data: IBasicData | IAdditionalData | IConfirmData) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
  }

  load(): IBasicData | IAdditionalData | IConfirmData | null {
    const dataJSON = localStorage.getItem(this.getStorageKey());
    if (dataJSON != null) {
      const data: IBasicData | IAdditionalData | IConfirmData = JSON.parse(dataJSON);
      return data;
    }
    return dataJSON;
  }

  private getStorageKey(): string {
    switch (this.currentStep()) {
      case 1:
        return 'basic';
      case 2:
        return 'additional';
      case 3:
        return 'confirm';
      default:
        return '';
    }
  }
}
