#include <stdio.h>
#include <unistd.h>
#include "../include/control.h"

#define GPIO_OUT1 17  // Pin GPIO 17
#define GPIO_OUT2 27  // Pin GPIO 27
#define GPIO_IN 22    // Pin GPIO 22

int main() {
    // Configurar GPIO_OUT1 y GPIO_OUT2 como salidas
    setupPinMode(GPIO_OUT1, OUTPUT);
    setupPinMode(GPIO_OUT2, OUTPUT);
    
    // Configurar GPIO_IN como entrada
    setupPinMode(GPIO_IN, INPUT);
    
    // Escribir un valor alto en GPIO_OUT1
    setDigitalWrite(GPIO_OUT1, HIGH);
    printf("GPIO %d set to HIGH\n", GPIO_OUT1);
    
    // Generar un blink en GPIO_OUT2 a 2 Hz por 5 segundos
    blink(GPIO_OUT2, 2, 5);
    printf("Blink en GPIO %d completado\n", GPIO_OUT2);
    
    // Leer el valor de GPIO_IN
    int value = getDigitalRead(GPIO_IN);
    printf("GPIO %d leído, valor: %d\n", GPIO_IN, value);
    
    return 0;
}
