import ctypes
import os

# Ruta a la biblioteca compartida
lib_path = os.path.join(os.path.dirname(__file__), "/usr/lib/libcontrol.so.0")
lib = ctypes.CDLL(lib_path)
#lib = ctypes.CDLL('/usr/lib/libcontrol.so.0')
# ../lib/.libs/libcontrol.so

# Definir los prototipos de las funciones que vamos a usar
lib.setPinMode.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.setPullMode.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.digitalWrite.argtypes = [ctypes.c_int, ctypes.c_char_p]
lib.digitalRead.restype = ctypes.c_int
lib.digitalRead.argtypes = [ctypes.c_int]
lib.blink.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

def main():
    # GPIO pin 
    PIN_13 = 13
    PIN_15 = 15
    PIN_16 = 16

    # Configurar PIN_13 y PIN_15 como salidas y el PIN_16 como entrada
    lib.setPinMode(PIN_13, b'op')  # 'op' significa output (salida)
    lib.setPinMode(PIN_15, b'op')
    lib.setPinMode(PIN_16, b'ip')  # 'ip' significa input (entrada)

    # Escribir un valor alto en PIN_13
    lib.digitalWrite(PIN_13, b'dh')  # 'dh' es drive-high (alto)
    lib.digitalWrite(PIN_15, b'dh') 

    # Leer el valor de PIN_13 y PIN_15
    valuePin_17 = lib.digitalRead(PIN_13)
    print(f"GPIO {PIN_13} leído, valor: {valuePin_17}")

    valuePin_27 = lib.digitalRead(PIN_15)
    print(f"GPIO {PIN_15} leído, valor: {valuePin_27}")

    # Generar un blink en GPIO_OUT2 a 2 Hz por 5 segundos
    lib.blink(PIN_15, 2, 5)

if __name__ == "__main__":
    main()