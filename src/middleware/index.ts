import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from './common';

import { handleAPIDocs } from './apiDocs';

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleAPIDocs,
];
