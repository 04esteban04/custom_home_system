#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h> 
#include "control.h"

// Función para ejecutar un comando en la terminal
void executeCommand(const char* command) {
    int result = system(command);
    if (result != 0) {
        printf("Error al ejecutar el comando: %s\n", command);
    }
}

// Función para configurar el modo de un pin GPIO
void setPinMode(int pin, const char* mode) {
    char command[64];
    snprintf(command, sizeof(command), "raspi-gpio set %d %s", pin, mode);
    executeCommand(command);
}

// Función para configurar la resistencia pull-up, pull-down o ninguna
void setPullMode(int pin, const char* pull) {
    char command[64];
    snprintf(command, sizeof(command), "raspi-gpio set %d %s", pin, pull);
    executeCommand(command);
}

// Función para escribir un valor (HIGH/LOW) en un pin GPIO
void digitalWrite(int pin, const char* value) {
    char command[64];
    snprintf(command, sizeof(command), "raspi-gpio set %d %s", pin, value);
    executeCommand(command);
}

// Función para leer el valor de un pin GPIO
int digitalRead(int pin) {
    char command[64];
    snprintf(command, sizeof(command), "raspi-gpio get %d > gpio_read.tmp", pin);
    executeCommand(command);

    // Abrir archivo temporal con el valor leído
    FILE* file = fopen("gpio_read.tmp", "r");
    if (!file) {
        printf("Error al leer el valor del GPIO\n");
        return -1;
    }

    char buffer[128];
    int value = -1;

    // Leer la línea que contiene el estado del pin
    while (fgets(buffer, sizeof(buffer), file)) {
        if (strstr(buffer, "level=1")) {
            value = 1;
        } else if (strstr(buffer, "level=0")) {
            value = 0;
        }
    }

    fclose(file);
    
    // Eliminar archivo temporal
    if (system("rm gpio_read.tmp") != 0) {
        printf("Error al eliminar el archivo temporal gpio_read.tmp\n");
    }  
    
    return value;
}

// Función para hacer parpadear un pin a una frecuencia determinada
void blink(int pin, int freq, int duration) {
    int interval = 1000 / (freq * 2);  // Intervalo en milisegundos

    setPinMode(pin, OUTPUT);  // Asegurarse de que el pin esté configurado como salida

    for (int i = 0; i < (duration * freq); i++) {
        digitalWrite(pin, HIGH);
        usleep(interval * 1000);  // Esperar en milisegundos
        digitalWrite(pin, LOW);
        usleep(interval * 1000);
    }
}