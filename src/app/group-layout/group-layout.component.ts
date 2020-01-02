import { Component, OnInit } from '@angular/core';
import { UserModelViewModel } from '../../../projects/shared/src/lib/models/user-model-view-model';
import { HttpClientService } from '../../../projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-group-layout',
  templateUrl: './group-layout.component.html',
  styleUrls: ['./group-layout.component.scss']
})
export class GroupLayoutComponent implements OnInit {

  groups: UserModelViewModel;
  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.httpClient.get('UserGroup').toPromise().then((data: UserModelViewModel) => {
      this.groups = data;
    });
  }
  addNewGroupClick() {
    // const ref = this.dialogService.open(CreateNewGroupDialogComponent, {
    //   header: 'Create new group',
    //   width: '70%',
    //   contentStyle: { "min-height": "350px", "overflow": "auto" }
    // });

    // ref.onClose.subscribe((car: Car) =>{
    //     if (car) {
    //         this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
    //     }
    // });
  }
  addUserToGroupClick(groupId: number) {
    // const ref = this.dialogService.open(AddUserToGroupComponent, {
    //   header: 'Add user',
    //   width: '70%',
    //   contentStyle: { "min-height": "350px", "overflow": "auto" }
    // });

  }
}
