#include <wiringPi.h>
#include "control.h"

void pinMode(int pin, int mode) {
    wiringPiSetupGpio(); 
    pinMode(pin, mode);
}

void digitalWrite(int pin, int value) {
    wiringPiSetupGpio(); 
    digitalWrite(pin, value);
}

int digitalRead(int pin) {
    wiringPiSetupGpio(); 
    return digitalRead(pin);
}

void blink(int pin, int freq, int duration) {
    wiringPiSetupGpio(); 
    pinMode(pin, OUTPUT); 
    int interval = 1000 / (freq * 2); 

    for (int i = 0; i < (duration * freq); i++) {
        digitalWrite(pin, HIGH);
        delay(interval); 
        digitalWrite(pin, LOW);
        delay(interval); 
    }
}