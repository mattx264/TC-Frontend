import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { TestRunResultViewModel } from 'projects/shared/src/lib/viewModels/TestRunResultViewModel';
import { SeleniumConverterService } from 'projects/shared/src/lib/services/selenium-converter.service';
import { SeleniumCommand } from 'projects/shared/src/lib/models/selenium/SeleniumCommand';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-test-run-result',
  templateUrl: './test-run-result.component.html',
  styleUrls: ['./test-run-result.component.scss']
})
export class TestRunResultComponent implements OnInit {
  testHistoryId: number;
  testRunResults: TestRunResultModel[] = [];

  constructor(
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private seleniumConverterService: SeleniumConverterService,
    public lightbox: Lightbox) {
    this.testHistoryId = +this.activatedRoute.snapshot.paramMap.get('test-history-id');
  }

  ngOnInit() {
    this.httpService.get(`testRunResult/${this.testHistoryId}`).subscribe((data: TestRunResultViewModel[]) => {
      data.forEach(element => {
        this.testRunResults.push({
          commandTestGuid: element.commandTestGuid,
          operator: this.seleniumConverterService.openOperator(element.seleniumCommand),
          createdBy: element.createdBy,
          seleniumCommand: element.seleniumCommand,
          runTime: element.runTime,
          screenshotUrl: element.screenshotUrl,
          isSuccesful: element.isSuccesful,
          dateAdded: element.dateAdded
        });
      });

    });
  }
  lightboxImageClick(index: number) {

    //this.lightbox.open(this.testRunResults.map(x=>x.screenshotUrl), index);
  }

}
export class TestRunResultModel implements TestRunResultViewModel {
  seleniumCommand: SeleniumCommand;
  commandTestGuid: string;
  runTime: number;
  screenshotUrl: string;
  isSuccesful: boolean;
  createdBy: string;
  dateAdded: Date;
  operator: {
    value: string;
    guid: string;
    action: string;
    path: string;
  }

}