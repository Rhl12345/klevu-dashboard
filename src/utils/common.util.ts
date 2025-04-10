export const getErrorMessage = (error: any, customMessage?: string): string => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : Object.keys(error)?.length > 0
        ? Object.values(error)?.[0]
        : customMessage || "Something went wrong";
  return errorMessage as string;
};
