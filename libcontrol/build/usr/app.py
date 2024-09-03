import ctypes
import os
import time

# Cargar la biblioteca compartida libRaspberry.so
lib_path = os.path.join(os.path.dirname(__file__), "../lib/.libs/libRaspberry.so")
gpio = ctypes.CDLL(lib_path)

# Definir prototipos de las funciones GPIO
gpio.pinMode.argtypes = [ctypes.c_int, ctypes.c_int]
gpio.digitalWrite.argtypes = [ctypes.c_int, ctypes.c_int]
gpio.digitalRead.restype = ctypes.c_int
gpio.digitalRead.argtypes = [ctypes.c_int]
gpio.blink.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

# Configuración de pines
PIN_OUT1 = 17  # GPIO17
PIN_OUT2 = 27  # GPIO27
PIN_IN = 22    # GPIO22

# Configurar los pines
gpio.pinMode(PIN_OUT1, 1)  # OUTPUT
gpio.pinMode(PIN_OUT2, 1)  # OUTPUT
gpio.pinMode(PIN_IN, 0)    # INPUT

# Escribir en PIN_OUT1
gpio.digitalWrite(PIN_OUT1, 1)
time.sleep(1)
gpio.digitalWrite(PIN_OUT1, 0)

# Blink en PIN_OUT2 por 5 segundos a 2 Hz
gpio.blink(PIN_OUT2, 2, 5)

# Leer el valor de PIN_IN
input_value = gpio.digitalRead(PIN_IN)
print(f"Valor leído del PIN_IN (GPIO22): {input_value}")
