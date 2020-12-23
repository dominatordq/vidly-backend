import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

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

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
