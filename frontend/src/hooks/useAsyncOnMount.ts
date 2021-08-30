import { useEffect } from "react";

export const useAsyncOnMount = <T>(
  asyncFn: () => Promise<T>,
  onSuccess: (data: T) => void
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
};
