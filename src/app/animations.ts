import { animate, style, transition, trigger } from "@angular/animations"

export const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({ opacity: .75 }),
    animate(".3s ease-in"),
  ]),
])

export const enterLeft = trigger("enterLeft", [
  transition(":enter", [
    style({ transform: "translateX(-100vw)" }),
    animate("1s ease-out"),
  ]),
])

export const enterLeaveRight = trigger("enterLeaveRight", [
  transition(":enter", [
    style({ transform: "translateX(100%)" }),
    animate(".2s ease-out"),
  ]),
  transition(":leave", [
    animate(".2s ease-out", style({ transform: "translateX(100%)" })),
  ]),
])
