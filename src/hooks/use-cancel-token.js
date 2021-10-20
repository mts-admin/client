import axios from 'axios';
import { useRef } from 'react';

const useCancelToken = () => {
  const cancelToken = useRef(null);

  // this func should be invoked only with api request
  const generateCancelToken = () => {
    cancelToken.current = axios.CancelToken.source();
    return cancelToken.current.token;
  };

  // this func should be invoked inside useEffect before new request
  // if some api request is pending it will be cannceled when new one appears
  const cancelRequest = () => {
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
  };

  return [generateCancelToken, cancelRequest];
};

export default useCancelToken;
