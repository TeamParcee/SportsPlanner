import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})

export class HideHeaderDirective {
  @Input("header") header: any;
  constructor(public element: ElementRef, public renderer: Renderer) {
    this.header;
    console.log('Hello HideHeaderDirective Directive');
  }
  ngOnInit() {
    console.log(this.header.el);
    // this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
  }
  onContentScroll(event) {
    console.log("hey");
    if (event.directionY == "down") {
      console.log("down")
      this.renderer.setElementStyle(this.header, 'top', '-56px');
    }
    else {
      console.log("up")
      this.renderer.setElementStyle(this.header, 'top', '0px');
    }
  }
}
