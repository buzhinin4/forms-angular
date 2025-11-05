import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-confirm-rules-page',
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-rules-page.html',
  styleUrl: './confirm-rules-page.css',
})
export class ConfirmRulesPage {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      terms: [false, Validators.requiredTrue],
      privacy: [false, Validators.requiredTrue],
      newsletter: [false],
    });

    this.loadData();
  }

  get termsCtrl() {
    return this.form.get('terms');
  }
  get privacyCtrl() {
    return this.form.get('privacy');
  }

  private loadData() {
    const saved = this.fs.load();
    if (saved) {
      this.form.patchValue(saved);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.fs.send();
      alert('The form is completed and sent');
    }
  }
}
