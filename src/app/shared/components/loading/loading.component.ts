import { Component, OnInit, Input,ElementRef, SimpleChange, SimpleChanges,ViewChild } from '@angular/core';
export enum LoadingState {
  NotReady,
  Processing,
  Ready
}

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  LoadingStateType = LoadingState; // pass type to template
  loading = LoadingState.NotReady;
  hasScroll = false;

  @Input('state') state: LoadingState;
  @ViewChild('target', { static: true }) tableContent: ElementRef;
  constructor(private element: ElementRef) { }

  adjustFixedColumn() {
    setTimeout(() => {
      let elements = this.element.nativeElement.querySelectorAll('.fixed-col');
      let widths = [];
      let i = 0;
      elements.forEach(el => {
        if (el.tagName == 'TH') {
          let total = widths.reduce((a, b) => a + b, 0);
          el.style.left = `${total > 0 ? total + 1 : 0}px`;
          widths.push(el.clientWidth);
        }
        else {
          let total = widths.slice(0, i).reduce((a, b) => a + b, 0);
          el.style.left = `${total > 0 ? total + 1 : 0}px`;
          i += 1;
        }
        if (i == widths.length) {
          i = 0;
        }
      });
    }, 100);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state) {
      if (changes.state.currentValue == LoadingState.Ready) {
        this.adjustFixedColumn();
        this.adjustTableView();
      }
    }
  }

  adjustTableView() {
    setTimeout(() => {
      let tableRef = this.element.nativeElement.querySelector('.enable-scroll');
      if (tableRef) {
        this.hasScroll = (tableRef.scrollWidth > tableRef.offsetWidth ? true : false);
      }
    }, 100);
  }

  scrollToRight() {
    let tableRef = this.element.nativeElement.querySelector('.enable-scroll');
    tableRef.scrollLeft += 150;
  }

  scrollToLeft() {
    let tableRef = this.element.nativeElement.querySelector('.enable-scroll');
    tableRef.scrollLeft -= 150;
  }

}
