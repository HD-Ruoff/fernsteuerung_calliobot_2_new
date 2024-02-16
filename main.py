def on_received_value(name, value):
    global richtung, geschwindigkeit
    if name == "Richtung":
        richtung = value
    else:
        geschwindigkeit = value
radio.on_received_value(on_received_value)

y_achse = 0
x_achse = 0
led_y_wert = 0
led_x_wert = 0
geschwindigkeit = 0
richtung = 0
radio.set_group(1)
radio.set_transmit_power(7)

def on_forever():
    global x_achse, richtung, y_achse, geschwindigkeit, led_x_wert, led_y_wert
    led.unplot(led_x_wert, led_y_wert)
    x_achse = Math.map(input.acceleration(Dimension.X), -1023, 1023, -50, 50)
    richtung = x_achse
    y_achse = Math.map(input.acceleration(Dimension.Y), 1023, -1023, 0, 100)
    geschwindigkeit = y_achse
    led_x_wert = Math.map(richtung, -50, 50, 0, 5)
    led_y_wert = Math.map(geschwindigkeit, 0, 100, 5, 0)
    led.plot(led_x_wert, led_y_wert)
    radio.send_value("Geschwindigkeit", geschwindigkeit)
    radio.send_value("Richtung", richtung)
basic.forever(on_forever)
