import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsCardComponent } from '../news-card/news-card.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NewsFormComponent } from '../news-form/news-form.component';
import { NewsViewModalComponent } from '../news-view-modal/news-view-modal.component';
import { INews } from '../../types/news-post';

interface DeleteModalData {
  id: string;
  title: string;
  description: string;
}

type ViewMode = 'cards' | 'table';
type FilterMode = 'all' | 'archived' | 'not-archived';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, DeleteModalComponent, NewsFormComponent, NewsViewModalComponent, FormsModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit {
  news: INews[] = [];
  filteredNews: INews[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  totalNews: number = 0;
  viewMode: ViewMode = 'table';
  
  searchQuery: string = '';
  filterMode: FilterMode = 'all';
  
  showNewsForm = false;
  editingNews: INews | null = null;
  
  showViewModal = false;
  viewingNews: INews | null = null;
  
  showDeleteModal = false;
  deleteModalData: DeleteModalData = {
    id: '',
    title: 'Delete News Post',
    description: 'Are you sure you want to delete this news post? This action cannot be undone.'
  };
  
  Math = Math;

  ngOnInit() {
    this.fetchList();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.pageSize);
  }

  get paginatedNews(): INews[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredNews.slice(startIndex, endIndex);
  }

  switchToCardsView() {
    this.viewMode = 'cards';
  }

  switchToTableView() {
    this.viewMode = 'table';
  }

  isCardsView(): boolean {
    return this.viewMode === 'cards';
  }

  isTableView(): boolean {
    return this.viewMode === 'table';
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(filter: FilterMode) {
    this.filterMode = filter;
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.news];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        (item.content_name?.toLowerCase().includes(query)) ||
        (item.title?.toLowerCase().includes(query)) ||
        (item.content?.toLowerCase().includes(query)) ||
        (item.news_text?.toLowerCase().includes(query))
      );
    }

    if (this.filterMode === 'archived') {
      filtered = filtered.filter(item => item.is_archived === true);
    } else if (this.filterMode === 'not-archived') {
      filtered = filtered.filter(item => item.is_archived !== true);
    }

    this.filteredNews = filtered;
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearchChange();
  }

  fetchList() {
    this.totalNews = 50;
    this.news = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      image_preview: 'https://bjimuaamzamjwqdzktbs.supabase.co/storage/v1/object/public/profiles/1751550105205',
      title: `News Post ${i + 1}`,
      content: `This is the content for news post ${i + 1}`,
      content_name: `News Post ${i + 1}`,
      news_text: `<p>This is a detailed news post content with <strong>HTML formatting</strong>. It contains multiple sentences to demonstrate the preview functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
      created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      is_archived: Math.random() > 0.7
    }));
    
    this.applyFilters();
  }

  createNewPost() {
    this.editingNews = null;
    this.showNewsForm = true;
  }

  onFormClose() {
    this.showNewsForm = false;
    this.editingNews = null;
  }

  onFormSave(newsData: INews) {
    if (this.editingNews) {
      const index = this.news.findIndex(n => n.id === this.editingNews!.id);
      if (index !== -1) {
        this.news[index] = { ...newsData };
      }
    } else {
      this.news.unshift(newsData);
      this.totalNews = this.news.length;
    }
    
    this.applyFilters();
    this.showNewsForm = false;
    this.editingNews = null;
  }

  onViewModalClose() {
    this.showViewModal = false;
    this.viewingNews = null;
  }

  onViewModalEdit(newsId: number) {
    this.showViewModal = false;
    this.viewingNews = null;
    this.editNews(newsId);
  }

  viewNews(newsId: number) {
    const newsItem = this.news.find(n => n.id === newsId);
    if (newsItem) {
      this.viewingNews = newsItem;
      this.showViewModal = true;
    }
  }

  editNews(newsId: number) {
    const newsItem = this.news.find(n => n.id === newsId);
    if (newsItem) {
      this.editingNews = newsItem;
      this.showNewsForm = true;
    }
  }

  archiveNews(newsId: number) {
    const newsItem = this.news.find(n => n.id === newsId);
    if (newsItem) {
      newsItem.is_archived = true;
      this.applyFilters();
    }
  }

  unarchiveNews(newsId: number) {
    const newsItem = this.news.find(n => n.id === newsId);
    if (newsItem) {
      newsItem.is_archived = false;
      this.applyFilters();
    }
  }

  onDeleteRequest(newsId: number) {
    const newsItem = this.news.find(n => n.id === newsId);
    if (newsItem) {
      this.deleteModalData = {
        id: newsItem.id.toString(),
        title: 'Delete News Post',
        description: `Are you sure you want to delete "${newsItem.content_name || newsItem.title}"? This action cannot be undone.`
      };
      this.showDeleteModal = true;
    }
  }

  onDeleteCancel() {
    this.showDeleteModal = false;
  }

  onDeleteConfirm() {
    const newsId = parseInt(this.deleteModalData.id);
    this.news = this.news.filter(n => n.id !== newsId);
    this.totalNews = this.news.length;
    this.applyFilters();
    this.showDeleteModal = false;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
    }
  }

  getVisiblePages(): number[] {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, this.currentPage - delta); 
         i <= Math.min(this.totalPages - 1, this.currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (this.currentPage - delta > 2) {
      rangeWithDots.push(1, -1);
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (this.currentPage + delta < this.totalPages - 1) {
      rangeWithDots.push(-1, this.totalPages);
    } else {
      rangeWithDots.push(this.totalPages);
    }

    return rangeWithDots.filter((page, index, array) => 
      array.indexOf(page) === index && page !== -1
    );
  }

  getPreviewText(newsText: string): string {
    const stripped = newsText.replace(/<[^>]*>/g, '');
    return stripped.length > 100 ? stripped.slice(0, 100) + '...' : stripped;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  trackByNewsId(index: number, newsItem: INews): number {
    return newsItem.id;
  }
}
