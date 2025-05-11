import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  imageUrl: string = '';
  description: string = '';
  tags: string[] = [];
  createdAt: string = '';
  updatedAt: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.imageUrl = params['imageUrl'];
      this.description = params['description'];
      this.tags = JSON.parse(params['tags']);
      this.createdAt = this.formatDate(params['createdAt']);
      this.updatedAt = this.formatDate(params['updatedAt']);
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
