export const extendResponseBy = <TSchema, TExtend>(response: TSchema, extension: TExtend) => {
  return {
    ...response,
    data: extension,
  };
};
