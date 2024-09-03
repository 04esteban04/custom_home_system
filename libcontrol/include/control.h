#ifndef LIBCONTROL_H
#define LIBCONTROL_H

// Definición de los modos de los pines
#define INPUT  0
#define OUTPUT 1
#define HIGH   1
#define LOW    0

void pinMode(int pin, int mode);
void digitalWrite(int pin, int value);
int digitalRead(int pin);
void blink(int pin, int freq, int duration);

#endif 
