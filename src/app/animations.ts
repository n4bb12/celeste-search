import { animate, style, transition, trigger } from "@angular/animations"

export const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({ opacity: .5 }),
    animate(".2s linear", style({ opacity: 1 })),
  ]),
])
