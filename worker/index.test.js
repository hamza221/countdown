import { test } from 'node:test';
import assert from 'node:assert';
import worker from './index.js';

test('should return 400 when flight_iata parameter is missing', async () => {
  const request = new Request('https://example.com/');
  const env = {
    ALLOWED_ORIGIN: 'https://example.com'
  };

  const response = await worker.fetch(request, env);

  assert.strictEqual(response.status, 400);
  const data = await response.json();
  assert.strictEqual(data.error, 'flight_iata parameter required');
});

test('should allow OPTIONS request', async () => {
    const request = new Request('https://example.com/', {
        method: 'OPTIONS',
        headers: {
            'Origin': 'https://flights.hamzamahjoubi.com'
        }
    });
    const env = {
        ALLOWED_ORIGIN: 'https://flights.hamzamahjoubi.com'
    };

    const response = await worker.fetch(request, env);
    assert.strictEqual(response.status, 204);
});

test('should return 403 when origin is not allowed', async () => {
    const request = new Request('https://example.com/', {
        headers: {
            'Origin': 'https://malicious.com'
        }
    });
    const env = {
        ALLOWED_ORIGIN: 'https://flights.hamzamahjoubi.com'
    };

    const response = await worker.fetch(request, env);
    assert.strictEqual(response.status, 403);
});
