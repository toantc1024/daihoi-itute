import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (callback: Function) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1s
      await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
}; 