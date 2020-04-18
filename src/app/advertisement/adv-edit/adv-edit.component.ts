import {Component, Input, OnInit} from '@angular/core';
import {StuffDto} from '../../models/generated';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StuffService} from '../../services/stuff.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-adv-edit',
  templateUrl: './adv-edit.component.html',
  styleUrls: ['./adv-edit.component.scss']
})
export class AdvEditComponent implements OnInit {

  stuffUnit: StuffDto;
  stuffForm: FormGroup;

  constructor(
    private stuffService: StuffService,
    private router: Router,
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
      contactEmail: null,
      defaultMessage: null
    };
  }

  prepareForm() {
    this.stuffForm = new FormGroup({
      stuffName: new FormControl(this.stuffUnit.stuffName, Validators.required),
      contactEmail: new FormControl(this.stuffUnit.contactEmail, Validators.email),
      defaultMessage: new FormControl(this.stuffUnit.defaultMessage),
    });
  }

  saveInput() {
    if (this.stuffForm.valid) {
      this.stuffService.saveUpdateStuff(this.stuffUnit)
        .subscribe(() => this.router.navigate(['stuff']));
    }
  }

  cancel() {
    this.router.navigate(['stuff']);
  }
}
