export default {
  async fetch(request, env) {
    // CORS: only allow your site
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || 'https://zsofi.hamzamahjoubi.com';

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

    // Only allow GET
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    // Get flight_iata from query string
    const url = new URL(request.url);
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
  },
};
