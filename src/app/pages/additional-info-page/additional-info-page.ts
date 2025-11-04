import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-additional-info-page',
  imports: [ReactiveFormsModule, NgSelectComponent],
  templateUrl: './additional-info-page.html',
  styleUrl: './additional-info-page.css',
})
export class AdditionalInfoPage implements OnInit {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  isUnder18: false | true = false;
  genders: ('Male' | 'Female')[] = ['Male', 'Female'];
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      city: ['', [Validators.required, Validators.pattern(/^[\p{L}\-\s]+$/u)]],
      street: ['', Validators.required],
      birthDate: ['', [Validators.required]],
      gender: ['', Validators.required],
      guardianName: [''],
      guardianEmail: [''],
    });

    this.loadData();
  }

  get cityCtrl() {
    return this.form.get('city');
  }
  get streetCtrl() {
    return this.form.get('street');
  }
  get birthDateCtrl() {
    return this.form.get('birthDate');
  }
  get genderCtrl() {
    return this.form.get('gender');
  }
  get guardianNameCtrl() {
    return this.form.get('guardianName');
  }
  get guardianEmailCtrl() {
    return this.form.get('guardianEmail');
  }

  private loadData() {
    const saved = this.fs.load();
    if (saved) {
      this.form.patchValue(saved);
    }
  }

  onBirthDateChange() {
    const birthDate = this.form.get('birthDate')?.value;
    if (birthDate) {
      const age = this.getYearDifference(new Date(), new Date(birthDate));
      this.isUnder18 = age < 18;

      const nameCtrl = this.form.get('guardianName');
      const emailCtrl = this.form.get('guardianEmail');

      if (this.isUnder18) {
        nameCtrl?.setValidators([Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]);
        emailCtrl?.setValidators([Validators.required, Validators.email]);
      } else {
        nameCtrl?.clearValidators();
        emailCtrl?.clearValidators();
      }

      nameCtrl?.updateValueAndValidity();
      emailCtrl?.updateValueAndValidity();
    }
  }

  getYearDifference(date1: Date, date2: Date) {
    let yearDifference = date2.getFullYear() - date1.getFullYear();

    const monthDifference = date2.getMonth() - date1.getMonth();
    const dayDifference = date2.getDate() - date1.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      yearDifference--;
    }

    return yearDifference;
  }

  onSubmit() {
    if (this.form.valid) {
      this.fs.save(this.form.value);
      this.fs.next();
    }
  }
}
