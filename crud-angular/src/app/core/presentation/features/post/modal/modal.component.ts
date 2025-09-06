import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PostDto, UpdatePostDto } from '../../../../application/dtos/post.dto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() public isOpen = false;
  @Input() public post: PostDto | null = null;
  @Input() public loading = false;
  @Output() public close = new EventEmitter<void>();
  @Output() public submit = new EventEmitter<UpdatePostDto>();

  public ngOnInit(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  public onClose(): void {
    this.close.emit();
  }

  public onSubmit(updateData: UpdatePostDto): void {
    this.submit.emit(updateData);
  }

  public onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
