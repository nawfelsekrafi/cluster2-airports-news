import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DeleteModalData {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() open: boolean = false;
  @Input() data: DeleteModalData = {
    id: '',
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.'
  };
  
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit();
  }
}
