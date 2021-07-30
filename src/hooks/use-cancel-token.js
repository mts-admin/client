import axios from 'axios';

const useCancelToken = () => {
  const { CancelToken } = axios;
  const source = CancelToken.source();

  return [source.token, source.cancel];
};

export default useCancelToken;
