radio.onReceivedValue(function (name, value) {
    if (name == "Richtung") {
        richtung = value
    } else {
        geschwindigkeit = value
    }
})
let motor_rechts = 0
let motor_links = 0
let led_y_wert = 0
let led_x_wert = 0
let geschwindigkeit = 0
let richtung = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(function () {
    led.unplot(led_x_wert, led_y_wert)
    led_x_wert = Math.map(richtung, -50, 50, 0, 5)
    led_y_wert = Math.map(geschwindigkeit, 0, 100, 5, 0)
    led.plot(led_x_wert, led_y_wert)
    motor_links = geschwindigkeit + richtung
    motor_rechts = geschwindigkeit - richtung
    if (motor_links > 100) {
        calliBot2.motor(C2Motor.links, C2Dir.vorwaerts, 0)
    } else if (motor_rechts > 100) {
        calliBot2.motor(C2Motor.rechts, C2Dir.vorwaerts, 100)
    } else if (motor_rechts < 0) {
        calliBot2.motor(C2Motor.rechts, C2Dir.vorwaerts, 0)
    } else {
        calliBot2.motor(C2Motor.links, C2Dir.vorwaerts, motor_links)
        calliBot2.motor(C2Motor.rechts, C2Dir.vorwaerts, motor_rechts)
    }
})
