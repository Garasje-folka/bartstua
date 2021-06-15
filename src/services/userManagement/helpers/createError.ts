const createError = (code: string, message?: string) => {
  const error = new Error();
  return {
    code: code,
    message: message,
    trace: error.stack,
  };
};

export { createError };
