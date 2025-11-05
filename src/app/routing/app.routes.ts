import { Routes } from '@angular/router';
import { BaseInfoPage } from '../pages/base-info-page/base-info-page';
import { AdditionalInfoPage } from '../pages/additional-info-page/additional-info-page';
import { ConfirmRulesPage } from '../pages/confirm-rules-page/confirm-rules-page';
import { LayoutPage } from '../pages/layout-page/layout-page';
import { stepGuard } from './route-guards/can-go-to-form-guard';
import { RoutePath } from './route-path.enum';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      { path: '', component: BaseInfoPage, canActivate: [stepGuard] },
      { path: RoutePath.BASE, component: BaseInfoPage, canActivate: [stepGuard] },
      { path: RoutePath.ADDITIONAL, component: AdditionalInfoPage, canActivate: [stepGuard] },
      { path: RoutePath.CONFIRM, component: ConfirmRulesPage, canActivate: [stepGuard] },
    ],
  },
];
