import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/testInfo-ViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicViewModel } from 'projects/shared/src/lib/models/basicViewModel';

@Component({
  selector: 'app-project-test-commands',
  templateUrl: './project-test-commands.component.html',
  styleUrls: ['./project-test-commands.component.scss']
})
export class ProjectTestCommandsComponent implements OnInit {
  testId: number;
  testInfo: TestInfoViewModel;
  projectId: number;
  typeOfCommand: BasicViewModel[] = [{ label: 'WebDriverOperationType', value: 'WebDriverOperationType' }];
  typeOfSubCommand: ({ label: string; value: string; })[];

  constructor(
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.parent.params.subscribe(x => {
      this.projectId = +x.id;
    });
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
  }

  ngOnInit() {

    this.httpService.get('testInfo/' + this.testId).subscribe((data: TestInfoViewModel) => {
      this.testInfo = data;
    });

  }
  // typeOfCommandChange(event) {
  //   this.typeOfSubCommand = [{ label: 'BrowserOperation', value: 'BrowserOperation' },
  //   { label: 'ElementOperation', value: 1 },
  //   { label: 'Locators', value: 2 },
  //   { label: 'SelectElementOperation', value: 3 },
  //   { label: 'BrowserNavigationOperation', value: 4 }];
  // }
  // typeOfSubCommandChange(event) {
  //   switch (event.value) {
  //     case 1:
  //       this.commands = [{ label: 'Click', value: { value: 0, type: 0 } },
  //       { label: 'SendKeys', value: { value: 1, type: 1 } }, { label: 'Clear', value: { value: 2, type: 0 } },
  //       { label: 'Submit', value: { value: 3, type: 0 } }, { label: 'Text', value: { value: 4, type: 0 } },
  //       { label: 'Enabled', value: { value: 5, type: 0 } }, { label: 'Displayed', value: { value: 6, type: 0 } },
  //       { label: 'DragAndDropToOffset', value: { value: 7, type: 2 } }];
  //       break;
  //     case 2:
  //       this.commands = [{ label: 'ByClassName', value: { value: 0, type: 1 } }, { label: 'ByCssSelector', value: { value: 1, type: 1 } },
  //       { label: 'ById', value: { value: 2, type: 1 } }, { label: 'ByLinkText', value: { value: 3, type: 1 } },
  //       { label: 'ByName', value: { value: 4, type: 1 } }, { label: 'ByPartialLinkText', value: { value: 5, type: 1 } },
  //       { label: 'ByTagName', value: { value: 6, type: 1 } }, { label: 'ByXPath', value: { value: 7, type: 1 } }];
  //       break;
  //     case 4:
  //       this.commands = [//{ label: 'WebDriverWait', value: 'WebDriverWait' }, { label: 'WaitUntil', value: 'WaitUntil' },
  //         { label: 'WaitUntilBrowserReady', value: { value: 2, type: 0 } }, { label: 'GoToUrl', value: { value: 3, type: 1 } }];
  //       // { label: 'Title', value: 'Title' }, { label: 'Url', value: 'Url' },
  //       // { label: 'PageSource', value: 'PageSource' }, { label: 'WindowHandles', value: 'WindowHandles' },
  //       // { label: 'GetScreenshot', value: 'GetScreenshot' }, { label: 'Url', value: 'Url' },
  //       //  { label: 'Title', value: 'Title' }, { label: 'Url', value: 'Url' }]
  //       break;

  //   }
  //   this.commandModel.webDriverOperationType = event.value;
  // }
  // commandChange(event) {
  //   switch (event.value.type) {
  //     case 1:
  //       this.showValue1 = true;
  //       this.commandModel.values = [''];
  //       break;
  //   }
  //   this.commandModel.operationId = event.value.value;
  //   this.showSendBtn = true;
  // }
  save() {
    
    this.testInfo.commands = [];

    this.httpService.put('testInfo', this.testInfo)
      .subscribe(
        r => this.router.navigate(['/project', this.projectId, 'tests']),
        e => alert(e.error)
      );
  }
}
