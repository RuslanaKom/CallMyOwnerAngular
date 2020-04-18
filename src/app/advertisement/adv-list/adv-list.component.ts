import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvDto, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adv-list',
  templateUrl: './adv-list.component.html',
  styleUrls: ['./adv-list.component.scss']
})
export class AdvListComponent implements OnInit {

  advListLost: AdvDto[];
  advListFound: AdvDto[];

  ngOnInit() {
    this.advListLost = this.createDummyAdsLost();
    this.advListFound = this.createDummyAdsFound();
  }

  createDummyAdsLost(){
    const advDto1 = {
    id: '1',
    header: 'Dog lost',
    text: 'Our best friend Lucky is lost. Please let us know if you see him',
    type: 'LOST',
    category: 'ANIMAL',
    phone: '+3705864584',
    region: 'Vilnius',
    imageUrl: ['http://127.0.0.1:8080/dog.jpg'],
    date: new Date()
    };
    const advDto3 = {
      id: '3',
      header: 'Lost my favourite gloves',
      text: 'Please help me find my gloves',
      type: 'LOST',
      category: 'CLOTHES',
      phone: '+3706868747',
      region: 'Vilnius',
      imageUrl: ['http://127.0.0.1:8080/gloves.jpg'],
      date: new Date()
    };
    const advDto5 = {
      id: '5',
      header: 'Please return my pants!',
      text: 'Anybody seen my pants around?',
      type: 'LOST',
      category: 'CLOTHES',
      phone: '+370686741',
      region: 'Vilnius',
      imageUrl: ['http://127.0.0.1:8080/pants.jpg'],
      date: new Date()
    };
    return [advDto1, advDto3, advDto5];
  }

  createDummyAdsFound(){
    const advDto2 = {
      id: '2',
      header: 'Cat found in the street',
      text: 'Found a cat near the tower. Hope to find his home.',
      type: 'FOUND',
      category: 'ANIMAL',
      phone: '+3706868747',
      region: 'Klaipeda',
      imageUrl: ['http://127.0.0.1:8080/cat.jpg'],
      date: new Date()
    };
    const advDto4 = {
      id: '4',
      header: 'Phone found',
      text: 'I have found a phone. Call me if you want it back',
      type: 'FOUND',
      category: 'TECHNICAL',
      phone: '+3706868747',
      region: 'Vilnius',
      imageUrl: ['http://127.0.0.1:8080/phone.jpg'],
      date: new Date()
    };
    return [advDto2, advDto4];
  }
}
