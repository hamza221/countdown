export default {
  async fetch(request, env) {
    // CORS: only allow your site
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || 'https://flights.hamzamahjoubi.com';

    if (origin && origin !== allowed) {
      return new Response('Forbidden', { status: 403 });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowed,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // --- Admin API to save flights to KV ---
    if (request.method === 'POST' && url.pathname === '/api/flights') {
      const authHeader = request.headers.get('Authorization');
      if (!env.ADMIN_TOKEN || authHeader !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response('Unauthorized', { status: 401, headers: corsHeaders });
      }

      try {
        const body = await request.json();
        const id = body.id || crypto.randomUUID();

        await env.FLIGHTS_KV.put(id, JSON.stringify(body));

        return new Response(JSON.stringify({ success: true, id }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to save flight' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // --- API to get flight config from KV ---
    if (request.method === 'GET' && url.pathname.startsWith('/api/flights/')) {
      const id = url.pathname.split('/').pop();
      try {
        const data = await env.FLIGHTS_KV.get(id);
        if (!data) {
          return new Response(JSON.stringify({ error: 'Flight not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        return new Response(data, {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'KV error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // --- Existing AirLabs Proxy ---
    if (request.method === 'GET' && url.pathname === '/') {
      const flightIata = url.searchParams.get('flight_iata');

      if (!flightIata) {
        return new Response(JSON.stringify({ error: 'flight_iata parameter required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Proxy to AirLabs with the secret key
      const apiUrl = `https://airlabs.co/api/v9/flight?flight_iata=${encodeURIComponent(flightIata)}&api_key=${env.AIRLABS_API_KEY}`;

      try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.text();

        return new Response(data, {
          status: apiResponse.status,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Upstream API error' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
};
