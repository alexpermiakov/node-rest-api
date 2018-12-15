export class HTTPClientError extends Error {
  status!: number;

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
  }
}

export class HTTP400Error extends HTTPClientError {
  status = 400;
  message = "Bad Request";
}

export class HTTP401Error extends HTTPClientError {
  status = 401;
  message = "Unauthorized";
}

export class HTTP403Error extends HTTPClientError {
  status = 403;
  message = "Forbidden";
}

export class HTTP404Error extends HTTPClientError {
  status = 404;
  message = "Not found";
}
