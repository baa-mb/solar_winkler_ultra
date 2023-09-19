function ampel (zustand: boolean) {
    zzz += 1
    // basic.pause(5000)
    // strip.showColor(neopixel.colors(NeoPixelColors.Black))
    if (!(zustand)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        basic.showNumber(zzz)
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
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
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.show()
}
function get_abstand () {
    abst = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
    // serial.writeValue("x", abst)
    return abst
}
input.onButtonPressed(Button.A, function () {
    ampel_aus()
    power.fullPowerOn(FullPowerSource.B)
    power.lowPowerRequest(LowPowerMode.Wait)
})
input.onButtonPressed(Button.B, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Purple))
})
function ampel_aus () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
}
let amp_zustand = false
let abstand = 0
let abst = 0
let strip: neopixel.Strip = null
let zzz = 0
basic.showIcon(IconNames.Yes)
let fang_abstand = 10
zzz = 0
strip = neopixel.create(DigitalPin.P8, 3, NeoPixelMode.RGB)
ampel_aus()
basic.forever(function () {
    basic.pause(2000)
    abstand = get_abstand()
    if (abstand < fang_abstand && abstand > 0) {
        led.plotBarGraph(
        abstand,
        25
        )
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.InBackground)
        amp_zustand = true
    } else {
        amp_zustand = false
    }
    ampel(amp_zustand)
})
