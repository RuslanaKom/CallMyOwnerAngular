import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stuff-line-header',
  templateUrl: './stuff-line-header.component.html',
  styleUrls: ['./stuff-line-header.component.scss']
})
export class StuffLineHeaderComponent {

  isDefault = true;

  @Output()
  directionChanged: EventEmitter<string> = new EventEmitter<string>();

  changeSortDirection() {
    if (this.isDefault) {
      this.isDefault = false;
    } else {
      this.isDefault = true;
    }
    this.directionChanged.emit(this.isDefault === true ? 'ASC' : 'DESC');
    console.log(this.isDefault);
  }

}
