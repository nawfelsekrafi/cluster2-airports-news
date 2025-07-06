import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INews } from '../../types/news-post';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {
  @Input() isOpen = false;
  @Input() editingNews: INews | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<INews>();

  newsForm: FormGroup;
  isSubmitting = false;
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.newsForm = this.createForm();
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.resetForm();
      if (this.editingNews) {
        this.populateForm(this.editingNews);
      }
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      content_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      news_text: ['', [Validators.required, Validators.minLength(20)]],
      is_archived: [false]
    });
  }

  private resetForm() {
    this.newsForm.reset();
    this.selectedImage = null;
    this.imagePreviewUrl = null;
    this.isSubmitting = false;
  }

  private populateForm(news: INews) {
    this.newsForm.patchValue({
      content_name: news.content_name || '',
      news_text: news.news_text || '',
      is_archived: news.is_archived || false
    });
    
    if (news.image_preview) {
      this.imagePreviewUrl = news.image_preview;
    }
  }

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      this.selectedImage = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreviewUrl = null;
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    if (this.newsForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.newsForm.value;
      
      const newsData: INews = {
        id: this.editingNews?.id || Date.now(),
        content_name: formData.content_name,
        title: formData.content_name,
        content: formData.content_name,
        news_text: formData.news_text,
        is_archived: formData.is_archived,
        created_at: this.editingNews?.created_at || new Date().toISOString(),
        image_preview: this.imagePreviewUrl || this.editingNews?.image_preview || ''
      };

      setTimeout(() => {
        this.onSave.emit(newsData);
        this.isSubmitting = false;
        this.close();
      }, 1000);
    } else {
      Object.keys(this.newsForm.controls).forEach(key => {
        this.newsForm.get(key)?.markAsTouched();
      });
    }
  }

  close() {
    this.resetForm();
    this.onClose.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.newsForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.newsForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      content_name: 'News Title',
      title: 'Title',
      content: 'Content',
      news_text: 'News Text'
    };
    return labels[fieldName] || fieldName;
  }

  get isEditMode(): boolean {
    return !!this.editingNews;
  }
}
