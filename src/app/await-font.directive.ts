import { Directive, ElementRef, Input, OnInit } from "@angular/core"

import * as FontFaceObserver from "fontfaceobserver"

export interface AwaitFontOptions {
  family: string
  weight: number
  style: string
  timeout: number
  transition: string
  [key: string]: any
}

const defaultOptions: AwaitFontOptions = {
  family: "Lato",
  weight: 400,
  style: "normal",
  timeout: 1000,
  transition: "opacity .4s ease-out",
}

@Directive({
  selector: "[cisAwaitFont]",
})
export class AwaitFontDirective implements OnInit {
  @Input("cisAwaitFont") options: Partial<AwaitFontOptions>

  constructor(private readonly el: ElementRef) { }

  private showContent = () => {
    this.el.nativeElement.style.opacity = 1
  }

  ngOnInit() {
    const style = this.el.nativeElement.style
    const { family, timeout, transition, ...options }
      = Object.assign({}, defaultOptions, this.options)

    style.opacity = "0"
    style.transition = transition

    new FontFaceObserver(family, options)
      .load(null, timeout)
      .then(() => {
        this.showContent()
      })
      .catch(error => {
        console.error(error)
        this.showContent()
      })
  }
}
