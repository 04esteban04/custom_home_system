#ifndef LIB_CONTROL_H
#define LIB_CONTROL_H

// Definición de los modos de los pines
#define INPUT  "ip"
#define OUTPUT "op"
#define HIGH   "dh"
#define LOW    "dl"
#define PULL_UP "pu"
#define PULL_DOWN "pd"
#define PULL_NONE "pn"

// Funciones para interactuar con los GPIOs
void setPinMode(int pin, const char* mode);
void setPullMode(int pin, const char* pull);
void digitalWrite(int pin, const char* value);
int digitalRead(int pin);
void blink(int pin, int freq, int duration);

// Funciones para webcam
void takeSS();

#endif
