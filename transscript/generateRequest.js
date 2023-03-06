import { generateNonce } from './generateNonce.js';

export function generateRequest(page, config) {
  // Extract the necessary parameters from the page HTML using string manipulation
  const params = page.split('"serializedShareEntity":"')[1]?.split('"')[0];
  const visitorData = page.split('"VISITOR_DATA":"')[1]?.split('"')[0];
  const sessionId = page.split('"sessionId":"')[1]?.split('"')[0];
  const clickTrackingParams = page?.split('"clickTrackingParams":"')[1]?.split('"')[0];

  // Construct and return the request object
  return {
    context: {
      client: {
        // Set the properties of the client object based on the config and hardcoded values
        hl: config?.lang || 'fr',
        gl: config?.country || 'FR',
        visitorData,
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)',
        clientName: 'WEB',
        clientVersion: '2.20200925.01.00',
        osName: 'Macintosh',
        osVersion: '10_15_4',
        browserName: 'Chrome',
        browserVersion: '85.0f.4183.83',
        screenWidthPoints: 1440,
        screenHeightPoints: 770,
        screenPixelDensity: 2,
        utcOffsetMinutes: 120,
        userInterfaceTheme: 'USER_INTERFACE_THEME_LIGHT',
        connectionType: 'CONN_CELLULAR_3G',
      },
      request: {
        // Set the properties of the request object
        sessionId,
        internalExperimentFlags: [],
        consistencyTokenJars: [],
      },
      user: {},
      clientScreenNonce: generateNonce(),
      clickTracking: {
        clickTrackingParams,
      },
    },
    params,
  };
}