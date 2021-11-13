import axios from 'axios';
import { useCallback, useRef } from 'react';

// TODO: think about moving cancel() call inside useEffect in this hook
const useCancelToken = () => {
  const cancelToken = useRef(null);

  // this func should be invoked only with api request
  const generateCancelToken = useCallback(() => {
    cancelToken.current = axios.CancelToken.source();
    return cancelToken.current.token;
  }, []);

  // this func should be invoked inside useEffect before new request
  // if some api request is pending it will be cannceled when new one appears
  const cancelRequest = useCallback(() => {
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
  }, [cancelToken]);

  return [generateCancelToken, cancelRequest];
};

export default useCancelToken;
