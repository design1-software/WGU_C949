const AT_BASE  = 'appIZnxctAFWm0N62';
const AT_TABLE = 'tbl8YYTQL5c93YgfJ';
const AT_ROOT  = `https://api.airtable.com/v0/${AT_BASE}/${AT_TABLE}`;

exports.handler = async (event) => {
  const pat = process.env.AT_PAT;
  if (!pat || pat === 'YOUR_AIRTABLE_PAT_HERE') {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'Leaderboard not configured' })
    };
  }

  // Pull recordId out; forward the rest of the raw query string as-is to Airtable
  const recordId = (event.queryStringParameters || {}).recordId || '';
  const forwardedQuery = (event.rawQuery || '')
    .split('&')
    .filter(p => p && !p.startsWith('recordId='))
    .join('&');

  let url = AT_ROOT;
  if (recordId) url += `/${recordId}`;
  if (forwardedQuery) url += `?${forwardedQuery}`;

  const fetchOpts = {
    method: event.httpMethod,
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/json'
    }
  };
  if (event.body) fetchOpts.body = event.body;

  try {
    const resp = await fetch(url, fetchOpts);
    const body = await resp.text();
    return {
      statusCode: resp.status,
      headers: { 'Content-Type': 'application/json' },
      body
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Upstream error', detail: err.message })
    };
  }
};
