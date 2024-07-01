import axios from "axios";
import { useCallback } from "react";
import { useState, useEffect } from "react";

async function sendHttpRequest({ url, method, config, data }) {
  try {
    const response = await axios({ 
      url,
      method,
      config,
      data
    });
    if (!response) {
      throw new Error('Error!')
    }
    return response.data;
  } catch(err) {
    throw new Error('Error!')
  }
}

export default function useHttp(reqConfig, initData) {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest({ ...reqConfig, data });
        setData(resData);
      } catch(err) {
        setError(error?.message || 'Something went wrong')
      }
      setIsLoading(false);
    }, 
    [reqConfig]
  );

  useEffect(() => {
    if (reqConfig?.method === 'GET' || !reqConfig || !reqConfig.method) {
      sendRequest();
    }
  }, [sendRequest, reqConfig]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  }
}