type CloudflareAnalyticsResponse = {
  data?: {
    viewer?: {
      zones?: Array<{
        today?: Array<{
          sum?: {
            visits?: number | null;
          };
        }>;
      }>;
    };
  };
  errors?: Array<{
    message?: string;
  }>;
};

type CloudflareGraphqlError = NonNullable<
  CloudflareAnalyticsResponse['errors']
>[number];

export type VisitorMetrics = {
  today: number;
};

const cloudflareGraphqlEndpoint =
  'https://api.cloudflare.com/client/v4/graphql';
const analyticsTimezoneOffsetHours = 9;

function getKstDayStart(date = new Date()) {
  const shiftedTime =
    date.getTime() + analyticsTimezoneOffsetHours * 60 * 60 * 1000;
  const shiftedDate = new Date(shiftedTime);

  shiftedDate.setUTCHours(0, 0, 0, 0);

  return new Date(
    shiftedDate.getTime() - analyticsTimezoneOffsetHours * 60 * 60 * 1000,
  );
}

export async function getCloudflareVisitorMetrics() {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const zoneTag = process.env.CLOUDFLARE_ZONE_TAG;

  if (!apiToken || !zoneTag) {
    return null;
  }

  const now = new Date();
  const todayStart = getKstDayStart(now);

  const query = `
    query VisitorMetrics($zoneTag: string, $todayStart: Time, $now: Time) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          today: httpRequestsAdaptiveGroups(
            limit: 1
            filter: {
              datetime_geq: $todayStart
              datetime_lt: $now
              requestSource: "eyeball"
            }
          ) {
            sum {
              visits
            }
          }
        }
      }
    }
  `;

  const response = await fetch(cloudflareGraphqlEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        zoneTag,
        todayStart: todayStart.toISOString(),
        now: now.toISOString(),
      },
    }),
    next: {
      revalidate: 1800,
    },
  });

  if (!response.ok) {
    console.error(
      'Failed to fetch Cloudflare analytics',
      response.status,
      response.statusText,
    );
    return null;
  }

  const payload = (await response.json()) satisfies CloudflareAnalyticsResponse;

  if (payload.errors?.length) {
    console.error(
      'Cloudflare analytics returned errors',
      payload.errors
        .map((error: CloudflareGraphqlError) => error.message)
        .join(', '),
    );
    return null;
  }

  const zone = payload.data?.viewer?.zones?.[0];

  return {
    today: zone?.today?.[0]?.sum?.visits ?? 0,
  } satisfies VisitorMetrics;
}
