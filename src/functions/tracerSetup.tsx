'use client'
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { ConsoleSpanExporter, BatchSpanProcessor, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { useEffect } from 'react';

const setupTracer = () => {
  const provider = new WebTracerProvider({
    resource:{
      attributes: {
        [SEMRESATTRS_SERVICE_NAME]: "marcos-next-14-client"
      }
    }
  });

  provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({
    url: "http://localhost:3030/body",

  })));
  
  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });
  
  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(), // CSS, JS, ...
      new UserInteractionInstrumentation(), // Clicks, ...
      new XMLHttpRequestInstrumentation(),
      new FetchInstrumentation()
    ],
  });
}

const OTTracer = () => {
  useEffect(() => {
    setupTracer()
  })
  return <></>
}

export default OTTracer;
