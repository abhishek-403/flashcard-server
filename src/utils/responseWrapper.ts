export const success = (statusCode: number, result: any) => {
  return {
    status: "success",
    statusCode,
    result,
  };
};
export const error = (statusCode: number, result: any) => {
  return {
    status: "error",
    statusCode,
    result,
  };
};
