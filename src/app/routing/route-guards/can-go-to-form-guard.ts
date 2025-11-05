import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormService } from '../../services/form-service';
import { RoutePath } from '../route-path.enum';

interface StepConfig {
  path: RoutePath;
  step: number;
}

const STEP_CONFIG: StepConfig[] = [
  { path: RoutePath.BASE, step: 1 },
  { path: RoutePath.ADDITIONAL, step: 2 },
  { path: RoutePath.CONFIRM, step: 3 },
];

export const stepGuard: CanActivateFn = (route, state) => {
  const fs = inject(FormService);
  const router = inject(Router);

  const currentPath = route.routeConfig?.path as RoutePath | undefined;

  const config = STEP_CONFIG.find((c) => c.path === currentPath);
  if (!config) return true;

  const requiredStep = config.step;
  const maxReachedStep = fs.maxStep();

  if (maxReachedStep < requiredStep) {
    const redirectConfig = STEP_CONFIG.find((c) => c.step === maxReachedStep) ?? STEP_CONFIG[0];

    return router.createUrlTree([redirectConfig.path]);
  }

  return true;
};
