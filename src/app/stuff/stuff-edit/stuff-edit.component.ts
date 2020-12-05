import {Component, Input, OnInit} from '@angular/core';
import {StuffDto} from '../../models/generated';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StuffService} from '../../services/stuff.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-stuff-edit',
  templateUrl: './stuff-edit.component.html',
  styleUrls: ['./stuff-edit.component.scss']
})
export class StuffEditComponent implements OnInit {

  stuffUnit: StuffDto;
  stuffForm: FormGroup;

  constructor(
    private stuffService: StuffService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '0') {
      this.stuffService.fetchStuffById(id).subscribe(response => {
        if (response.id) {
          this.stuffUnit = response;
        } else {
          this.prepareNewStuff();
        }
        this.prepareForm();
      });
    } else {
      this.prepareNewStuff();
      this.prepareForm();
    }
  }

  prepareNewStuff() {
    this.stuffUnit = {
      id: null,
      userId: null,
      stuffName: null,
      defaultMessage: null
    };
  }

  prepareForm() {
    this.stuffForm = new FormGroup({
      stuffName: new FormControl(this.stuffUnit.stuffName, Validators.required),
      defaultMessage: new FormControl(this.stuffUnit.defaultMessage),
    });
  }

  saveInput() {
    if (this.stuffForm.valid) {
      this.stuffService.saveUpdateStuff(this.stuffUnit)
        .subscribe(() => {
            this.router.navigate(['stuff']);
          },
          error => {
            console.log(error);
            this.showErrorPopUp(error);
          },
        );
    }
  }

  private showErrorPopUp(error: HttpErrorResponse) {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Cannot save the item';
    modalRef.componentInstance.content = error.error;
  }

  cancel() {
    this.router.navigate(['stuff']);
  }
}
