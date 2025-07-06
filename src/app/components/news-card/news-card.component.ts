import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDateToHumanReadable } from '../../helpers/dates';

interface News {
  id: number;
  title: string;
  content: string;
  content_name?: string;
  news_text?: string;
  image_preview?: string;
  created_at?: string;
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() news!: News;
  @Input() big?: boolean;
  @Input() horizontal?: boolean;
  @Output() fetchList = new EventEmitter<void>();
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() editRequest = new EventEmitter<number>();
  @Output() viewRequest = new EventEmitter<number>();

  showDropdown = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showDropdown = false;
    }
  }

  getNewsCardClasses(): string {
    let classes = 'news_card';
    if (this.big) classes += ' big-card';
    if (this.horizontal) classes += ' horizontal-card';
    return classes;
  }

  getImageAlt(): string {
    return this.news.content_name || this.news.title || 'News post image';
  }

  getDateInfo(): string {
    return formatDateToHumanReadable(this.news.created_at || '');
  }

  getNewsTitle(): string {
    return this.news.content_name || this.news.title || 'Untitled News Post';
  }

  getPreviewText(): string {
    const text = this.news.news_text || this.news.content || '';
    const stripped = this.stripHtml(text);
    const truncated = stripped.length > 150 ? stripped.slice(0, 150) + '...' : stripped;
    return truncated;
  }

  private stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || doc.body.innerText || '';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  viewNews() {
    this.closeDropdown();
    this.viewRequest.emit(this.news.id);
  }

  editNews() {
    this.closeDropdown();
    this.editRequest.emit(this.news.id);
  }

  archiveNews() {
    this.closeDropdown();
    this.fetchList.emit();
  }

  confirmDelete() {
    this.closeDropdown();
    this.deleteRequest.emit(this.news.id);
  }

  onRefresh() {
    this.fetchList.emit();
  }
}
