from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

class DualStackServer(HTTPServer):
    allow_reuse_address = True

def run(port=3000):
    server_address = ('', port)
    httpd = DualStackServer(server_address, SimpleHTTPRequestHandler)
    print(f"KLASSA Local Server running permanently at http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

if __name__ == '__main__':
    port = 3000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run(port)
