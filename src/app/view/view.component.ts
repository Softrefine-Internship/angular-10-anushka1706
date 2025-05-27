import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

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
  id: string = ''

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    });
    this.dataService.fetchImageById(this.id).subscribe(data => {
      this.imageUrl = data.imageUrl
      this.tags = Array.isArray(data.tags) ? data.tags : [];
      this.createdAt = data.createdAt
      this.updatedAt = data.updatedAt
      this.description = data.description
    })

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
