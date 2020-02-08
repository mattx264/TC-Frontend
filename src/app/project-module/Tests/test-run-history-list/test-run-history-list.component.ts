import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TestRunHistoryViewModel } from 'projects/shared/src/lib/viewModels/TestRunHistoryViewModel';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-run-history-list',
  templateUrl: './test-run-history-list.component.html',
  styleUrls: ['./test-run-history-list.component.scss']
})
export class TestRunHistoryListComponent implements OnInit {
  displayedColumns: string[] = ['testInfoName', 'isSuccesful', 'createdBy','dateAdded','details'];
  dataSource = new MatTableDataSource<TestRunHistoryViewModel>();
  projectId: number;
  testId: number;
  testName: string;
  constructor(private httpService: HttpClientService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
  }

  ngOnInit() {
    this.httpService.get('TestRunHistory/' + this.testId).subscribe((data: TestRunHistoryViewModel[]) => {
      this.dataSource.data = data;
      if(data.length===0){
        this.testName="Test was never executed."
        return;
      }
      this.testName=data[0].testInfoName;
    });
  }

}
