import socket
import sys
import threading

# Función para recibir datos del servidor
def receive_data(sock):
    while True:
        try:
            data = sock.recv(1024)
            if not data:
                break
            print("Servidor:", data.decode('utf-8'))
        except ConnectionResetError:
            break

def main():
    if len(sys.argv) != 3:
        print("Uso: python cliente_tcp.py <host> <puerto>")
        return

    host = sys.argv[1]
    port = int(sys.argv[2])

    # Crear un socket TCP
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        # Conectar al servidor
        server_address = (host, port)
        sock.connect(server_address)
        print('Conectado al servidor en', server_address)

        # Iniciar un hilo para recibir datos del servidor
        receive_thread = threading.Thread(target=receive_data, args=(sock,))
        receive_thread.start()

        # Leer el input del usuario y enviarlo al servidor
        while True:
            user_input = input()
            sock.sendall(user_input.encode('utf-8'))
            if user_input == 'END':
                break

    finally:
        # Cerrar el socket y esperar a que el hilo de recepción termine
        sock.close()
        receive_thread.join()
        print('Conexión cerrada.')

if __name__ == "__main__":
    main()
