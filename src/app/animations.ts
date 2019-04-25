import { animate, style, transition, trigger } from "@angular/animations"

export const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({ opacity: .5 }),
    animate(".2s linear"),
  ]),
])

export const moveInOutLeft = trigger("moveInOutLeft", [
  transition(":enter", [
    style({ transform: "translateX(-100vw)" }),
    animate(".5s ease-out"),
  ]),
  transition(":leave", [
    animate("1s ease-out", style({ transform: "translateX(-100vw)" })),
  ]),
])
