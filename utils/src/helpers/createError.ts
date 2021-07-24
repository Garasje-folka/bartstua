const createError = (code: string, message?: string) => {
  return {
    code: code,
    message: message,
  };
};

export { createError };
