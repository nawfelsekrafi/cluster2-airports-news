import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INews } from '../../types/news-post';

@Component({
  selector: 'app-news-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-view-modal.component.html',
  styleUrl: './news-view-modal.component.scss'
})
export class NewsViewModalComponent {
  @Input() isOpen = false;
  @Input() news: INews | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<number>();

  close() {
    this.onClose.emit();
  }

  editNews() {
    if (this.news) {
      this.onEdit.emit(this.news.id);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  }
} 