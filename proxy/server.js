import http from "http";

const PROXY_PORT = 4000;

const FRONTEND_HOST = "192.168.168.1";
const FRONTEND_PORT = 3000;

const BACKEND_HOST = "192.168.168.1";
const BACKEND_PORT = 3001;

// =========================
// HTTP Proxy
// =========================

const server = http.createServer((req, res) => {
  const isApiRequest = req.url.startsWith("/api/");

  const targetHost = isApiRequest ? BACKEND_HOST : FRONTEND_HOST;
  const targetPort = isApiRequest ? BACKEND_PORT : FRONTEND_PORT;

  const options = {
    hostname: targetHost,
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${targetHost}:${targetPort}`,
    },
  };

  console.log(`HTTP: ${req.method} ${req.url} → ${targetHost}:${targetPort}`);

  const proxyRequest = http.request(options, (proxyResponse) => {
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);

    proxyResponse.pipe(res);
  });

  proxyRequest.on("error", (error) => {
    console.error("HTTP Proxy Error:", error.message);

    if (!res.headersSent) {
      res.writeHead(502, {
        "Content-Type": "text/plain; charset=utf-8",
      });
    }

    res.end(`Proxy Error: ${error.message}`);
  });

  req.pipe(proxyRequest);
});

// =========================
// WebSocket Proxy
// =========================

server.on("upgrade", (req, clientSocket, head) => {
  console.log(`WebSocket Upgrade: ${req.url}`);

  const options = {
    hostname: FRONTEND_HOST,
    port: FRONTEND_PORT,
    path: req.url,
    method: "GET",
    headers: {
      ...req.headers,
      host: `${FRONTEND_HOST}:${FRONTEND_PORT}`,
    },
  };

  const proxyRequest = http.request(options);

  proxyRequest.on("upgrade", (proxyResponse, targetSocket, proxyHead) => {
    console.log(
      `WebSocket Connected: ${proxyResponse.statusCode} ${proxyResponse.statusMessage}`,
    );

    // Send the upgrade response back to the client
    clientSocket.write(
      `HTTP/1.1 ${proxyResponse.statusCode} ${proxyResponse.statusMessage}\r\n`,
    );

    for (const [header, value] of Object.entries(proxyResponse.headers)) {
      clientSocket.write(`${header}: ${value}\r\n`);
    }

    clientSocket.write("\r\n");

    // Forward any buffered data
    if (proxyHead.length) {
      targetSocket.write(proxyHead);
    }

    // Connect both sockets
    clientSocket.pipe(targetSocket);
    targetSocket.pipe(clientSocket);

    // Handle disconnects
    clientSocket.on("error", () => {
      targetSocket.destroy();
    });

    targetSocket.on("error", () => {
      clientSocket.destroy();
    });

    clientSocket.on("close", () => {
      targetSocket.destroy();
    });

    targetSocket.on("close", () => {
      clientSocket.destroy();
    });
  });

  proxyRequest.on("error", (error) => {
    console.error("WebSocket Proxy Error:", error.message);

    clientSocket.destroy();
  });

  proxyRequest.end();
});

// =========================
// Start Proxy
// =========================

server.listen(PROXY_PORT, "0.0.0.0", () => {
  console.log(`Proxy running on http://localhost:${PROXY_PORT}`);
});
