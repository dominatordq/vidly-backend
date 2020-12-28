import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://f7b53fc8e07f4922ae97bc89563a4eea@o495707.ingest.sentry.io/5568930",
        autoSessionTracking: true,
        integrations: [
          new Integrations.BrowserTracing(),
        ],
      
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default { init, log };