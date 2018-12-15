import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";

export default [handleCors, handleBodyRequestParsing, handleCompression];
