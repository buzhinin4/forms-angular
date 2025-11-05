import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { IBasicData } from '../../types/basic-data.interface';
import { IAdditionalData } from '../../types/additional-data.interface';
import { IConfirmData } from '../../types/confirm-data.inteface';
import { Router } from '@angular/router';
import { RoutePath } from '../routing/route-path.enum';

interface StepConfig {
  path: RoutePath;
  step: number;
}

const STEP_ORDER: StepConfig[] = [
  { path: RoutePath.BASE, step: 1 },
  { path: RoutePath.ADDITIONAL, step: 2 },
  { path: RoutePath.CONFIRM, step: 3 },
];

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
    localStorage.setItem('maxStepSig', JSON.stringify(this.maxStep()));
  }

  load(): IBasicData | IAdditionalData | IConfirmData | null {
    const maxStepSigJSON = localStorage.getItem('maxStepSig');

    if (maxStepSigJSON != null && JSON.parse(maxStepSigJSON) > this.maxStep()) {
      this.maxStepSig.set(JSON.parse(maxStepSigJSON));
    }

    const dataJSON = localStorage.getItem(this.getStorageKey());
    if (dataJSON != null) {
      const data: IBasicData | IAdditionalData | IConfirmData = JSON.parse(dataJSON);
      return data;
    }
    return dataJSON;
  }

  send() {
    localStorage.clear();

    this.maxStepSig.set(1);
    this.stepSig.set(1);
    this.navigate();
  }

  private getStorageKey(): string {
    return STEP_ORDER.find((s) => s.step === this.currentStep())!.path;
  }
}
