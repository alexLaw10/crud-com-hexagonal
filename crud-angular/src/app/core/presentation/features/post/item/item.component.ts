import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PostDto } from '../../../../application/dtos/post.dto';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() public post!: PostDto;
  @Output() public edit = new EventEmitter<PostDto>();
  @Output() public delete = new EventEmitter<string>();

  public onEdit(): void {
    this.edit.emit(this.post);
  }

  public onDelete(): void {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      this.delete.emit(this.post.id);
    }
  }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
