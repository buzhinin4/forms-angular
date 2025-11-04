import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '../../../types/country.interface';
import { COUNTRIES } from '../../../data/countries';
import { NgSelectComponent } from '@ng-select/ng-select';
import { mockUsers } from '../../../data/mock-users';
import { IMockUsers } from '../../../types/mock-users.interface';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-base-info-page',
  imports: [NgSelectComponent, ReactiveFormsModule],
  templateUrl: './base-info-page.html',
  styleUrl: './base-info-page.css',
})
export class BaseInfoPage implements OnInit {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  countries: Country[] = COUNTRIES;
  mockUsers: IMockUsers = mockUsers;
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      phonePrefix: [''],
      phoneNumber: ['', Validators.pattern(/^\d{4,12}$/)],
      telephone: [''],
    });

    this.loadData();
    this.setupSubscriptions();
  }

  get nameCtrl() {
    return this.form.get('name');
  }
  get emailCtrl() {
    return this.form.get('email');
  }
  get countryCtrl() {
    return this.form.get('country');
  }
  get phoneNumberCtrl() {
    return this.form.get('phoneNumber');
  }

  private loadData() {
    const saved = this.fs.load();
    if (saved) {
      this.form.patchValue(saved);
    }
  }

  private setupSubscriptions() {
    this.form.get('phoneNumber')?.valueChanges.subscribe(() => this.syncFullPhone());
  }

  syncFullPhone() {
    const prefix = this.form.get('phonePrefix')?.value || '';
    const number = this.form.get('phoneNumber')?.value || '';
    const full = prefix && number ? `${prefix}${number}` : '';

    this.form.get('telephone')?.setValue(full);
  }

  onCountryChange(country: Country | null) {
    if (country) {
      this.form.get('phonePrefix')?.setValue(country.phoneCode);
      this.syncFullPhone();
    } else {
      this.form.get('phonePrefix')?.setValue('');
      this.form.get('telephone')?.setValue('');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.fs.save(this.form.value);
      this.fs.next();
    }
  }

  loginWith(sn: 'google' | 'facebook' | 'github') {
    const user = this.mockUsers[sn];

    if (user) {
      this.form.patchValue(user);

      this.fs.save(this.form.value);
      this.fs.next();
    }
  }
}
