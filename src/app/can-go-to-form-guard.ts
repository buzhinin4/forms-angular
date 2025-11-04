import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormService } from './services/form-service';

export const stepGuard: CanActivateFn = (route, state) => {
  const fs = inject(FormService);
  const router = inject(Router);

  const stepMap: Record<string, number> = {
    '': 1,
    basic: 1,
    additional: 2,
    confirm: 3,
  };

  const path = route.routeConfig?.path;
  if (!path || !(path in stepMap)) return true;

  const requiredStep = stepMap[path];
  const maxStep = fs.maxStep();

  if (maxStep < requiredStep) {
    alert('You have not yet reached the desired part, go through the previous parts of the form');
    const redirectPath = maxStep === 1 ? '/basic' : maxStep === 2 ? '/additional' : '/basic';
    return router.createUrlTree([redirectPath]);
  }

  return true;
};
