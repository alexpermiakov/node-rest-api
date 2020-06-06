import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common';

import { handleAPIDocs } from './apiDocs';

import { handleRateLimit, handleHTTPHeaders, handleCSRF } from './security';

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleAPIDocs,
  handleRateLimit,
  handleHTTPHeaders,
  handleCSRF,
];
