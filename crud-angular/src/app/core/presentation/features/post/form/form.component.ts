import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreatePostDto, UpdatePostDto } from '../../../../application/dtos/post.dto';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input() public post: CreatePostDto | UpdatePostDto | null = null;
  @Input() public isEditMode = false;
  @Input() public loading = false;
  @Output() public submit = new EventEmitter<CreatePostDto | UpdatePostDto>();
  @Output() public cancel = new EventEmitter<void>();

  public postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.createForm();
  }

  public ngOnInit(): void {
    if (this.post && this.isEditMode) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.noWhitespaceValidator
      ]],
      body: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
        this.noWhitespaceValidator
      ]],
      userId: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]]
    });
  }

  private populateForm(): void {
    if (this.post) {
      this.postForm.patchValue({
        title: this.post.title || '',
        body: this.post.body || '',
        userId: this.post.userId || 1
      });
    }
  }

  private noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      if (this.isEditMode) {
        this.submit.emit(formValue as UpdatePostDto);
      } else {
        this.submit.emit(formValue as CreatePostDto);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  public onCancel(): void {
    this.postForm.reset();
    this.cancel.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.postForm.controls).forEach(key => {
      const control = this.postForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar o acesso no template
  public get title() { return this.postForm.get('title'); }
  public get body() { return this.postForm.get('body'); }
  public get userId() { return this.postForm.get('userId'); }
}
