function ampel () {
    zzz += 1
    basic.showNumber(zzz)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.show()
    basic.pause(5000)
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
    strip.show()
    basic.pause(2000)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    strip.show()
    basic.pause(5000)
    for (let index = 0; index < 4; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(500)
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        strip.show()
        basic.pause(500)
    }
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
    strip.show()
    basic.pause(2000)
}
function get_abstand () {
    abst = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P8,
    PingUnit.Centimeters
    )
    return abst
}
let abstand = 0
let abst = 0
let strip: neopixel.Strip = null
let zzz = 0
basic.showIcon(IconNames.Yes)
zzz = 0
strip = neopixel.create(DigitalPin.P3, 3, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
basic.forever(function () {
    basic.pause(1000)
    abstand = get_abstand()
    if (abstand < 10) {
        basic.showNumber(abstand)
    } else {
        basic.showNumber(0)
    }
    ampel()
})
