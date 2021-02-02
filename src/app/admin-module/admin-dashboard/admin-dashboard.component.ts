import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  redisKeys: any;

  constructor(private httpClientService: HttpClientService) { }

  async ngOnInit(): Promise<void> {
    this.redisKeys = await this.httpClientService.getByPromise('RedisAdmin')
  }

}
