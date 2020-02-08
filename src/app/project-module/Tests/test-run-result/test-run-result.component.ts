import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-run-result',
  templateUrl: './test-run-result.component.html',
  styleUrls: ['./test-run-result.component.scss']
})
export class TestRunResultComponent implements OnInit {
  testHistoryId: number;

  constructor(private httpService: HttpClientService, private activatedRoute: ActivatedRoute) {
   
    this.testHistoryId = +this.activatedRoute.snapshot.paramMap.get('test-history-id');
  }

  ngOnInit() {
   
  }

}
