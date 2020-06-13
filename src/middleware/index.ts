import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common';

import { handleAPIDocs } from './apiDocs';
import { handleRateLimit, handleHTTPHeaders, handleCSRF } from './security';
import { handleLogging } from './logging';

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleAPIDocs,
  handleRateLimit,
  handleHTTPHeaders,
  handleCSRF,
  handleLogging,
];
