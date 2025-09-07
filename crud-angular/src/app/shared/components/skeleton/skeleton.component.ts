import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  @Input() public width: string = '100%';
  @Input() public height: string = '20px';
  @Input() public borderRadius: string = '4px';
  @Input() public animation: 'pulse' | 'wave' | 'none' = 'pulse';
  @Input() public lines: number = 1;
  @Input() public spacing: string = '8px';

  public linesArray: number[] = [];

  public ngOnInit(): void {
    this.linesArray = Array(this.lines).fill(0).map((_, index) => index);
  }
}
