import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"

import { noop } from "lodash"

@Component({
  selector: "cis-input-range",
  templateUrl: "./range.component.html",
  styleUrls: ["./range.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRangeComponent),
      multi: true,
    },
  ],
})
export class InputRangeComponent implements ControlValueAccessor, OnChanges {

  @Input() min = 0
  @Input() max = 100
  @Input() step = 1
  @Input() value = 0

  @ViewChild("track", { static: true }) track: ElementRef

  ratio = 0
  dragging = false
  hovering = false

  private propagateChange: (value: number) => void = noop

  ngOnChanges(changes: SimpleChanges) {
    this.updateValue(this.value)
  }

  onPointerdown(event: MouseEvent) {
    this.dragging = true
    this.updateRatio(event)
  }

  onPointermove(event: MouseEvent) {
    if (this.dragging) {
      this.updateRatio(event)
    }
  }

  onPointerup(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false
      this.updateRatio(event)
    }
  }

  private updateRatio(event: MouseEvent) {
    const track = this.track.nativeElement.getBoundingClientRect()
    const ratio = (event.clientX - track.left) / track.width

    this.ratio = Math.max(0, Math.min(1, ratio))

    const { min, max } = this
    const range = max - min
    const value = min + range * ratio

    this.updateValue(value)
  }

  private updateValue(value: number) {
    const { min, max, step } = this

    value = Math.round(value / step) * step
    value = Math.max(min, Math.min(max, value))

    this.ratio = (value - min) / (max - min)

    if (this.value !== value) {
      this.value = value
      this.propagateChange(value)
    }
  }

  /** @ControlValueAccessor */
  writeValue(value: number): void {
    this.updateValue(value)
  }

  /** @ControlValueAccessor */
  registerOnChange(fn) {
    this.propagateChange = fn
  }

  /** @ControlValueAccessor */
  registerOnTouched() {
    // empty
  }

}
