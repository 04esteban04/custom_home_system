import ctypes
import os

# Ruta a la biblioteca compartida
lib_path = os.path.join(os.path.dirname(__file__), "../lib/.libs/libcontrol.so")
lib = ctypes.CDLL(lib_path)
#lib = ctypes.CDLL('/usr/lib/libcontrol.so.0')

# Definir los prototipos de las funciones que vamos a usar
lib.setPinMode.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.setPullMode.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.digitalWrite.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.digitalRead.restype = ctypes.c_int
lib.digitalRead.argtypes = [ctypes.c_int]
lib.blink.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

def main():
    # GPIO pin 
    GPIO_17 = 17
    GPIO_27 = 27
    GPIO_22 = 22

    # Configurar GPIO_17 y GPIO_27 como salidas y el GPIO_22 como entrada
    lib.setPinMode(GPIO_17, b'op')  # 'op' significa output (salida)
    lib.setPinMode(GPIO_27, b'op')
    lib.setPinMode(GPIO_22, b'ip')  # 'ip' significa input (entrada)

    # Escribir un valor alto en GPIO_17
    lib.digitalWrite(GPIO_17, b'dh')  # 'dh' es drive-high (alto)
    lib.digitalWrite(GPIO_27, b'dh') 

    # Leer el valor de GPIO_17 y GPIO_27
    valuePin_17 = lib.digitalRead(GPIO_17)
    print(f"GPIO {GPIO_17} leído, valor: {valuePin_17}")

    valuePin_27 = lib.digitalRead(GPIO_27)
    print(f"GPIO {GPIO_27} leído, valor: {valuePin_27}")

    # Generar un blink en GPIO_OUT2 a 2 Hz por 5 segundos
    lib.blink(GPIO_27, 2, 5)

if __name__ == "__main__":
    main()