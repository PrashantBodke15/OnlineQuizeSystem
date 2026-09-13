const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../app')();

function request(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      http.get(`http://127.0.0.1:${port}${path}`, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
          server.close();
          resolve({ status: response.statusCode, body: JSON.parse(body) });
        });
      }).on('error', (error) => {
        server.close();
        reject(error);
      });
    });
  });
}

test('GET /api/health returns service status', async () => {
  const response = await request('/api/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok', service: 'online-quiz-system' });
});
