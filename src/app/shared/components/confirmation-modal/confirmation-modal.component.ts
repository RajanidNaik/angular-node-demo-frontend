import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  @Input() visible = false;

  @Input() title = 'Confirmation';

  @Input() message = 'Are you sure?';

  @Output() confirm = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();
    onConfirm() {

    this.confirm.emit();

  }

  onCancel() {

    this.cancel.emit();

  }
}
