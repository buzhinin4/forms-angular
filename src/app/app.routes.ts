import { Routes } from '@angular/router';
import { BaseInfoPage } from './pages/base-info-page/base-info-page';
import { AdditionalInfoPage } from './pages/additional-info-page/additional-info-page';
import { ConfirmRulesPage } from './pages/confirm-rules-page/confirm-rules-page';
import { LayoutPage } from './pages/layout-page/layout-page';
import { stepGuard } from './can-go-to-form-guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      { path: '', component: BaseInfoPage, canActivate: [stepGuard] },
      { path: 'basic', component: BaseInfoPage, canActivate: [stepGuard] },
      { path: 'additional', component: AdditionalInfoPage, canActivate: [stepGuard] },
      { path: 'confirm', component: ConfirmRulesPage, canActivate: [stepGuard] },
    ],
  },
];
