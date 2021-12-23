import { useEffect, useState } from "react";

/**
 * useFetch function
 * loading
 * error
 * data
 * url
 * parameters obj
 */
function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchRequest = () => {
    // const config = {
    //   // * hardcoding it to method: GET
    //   method: "GET"
    // }
    setLoading(true);
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   url && fetchRequest();
  // }, [url]);

  return {
    loading,
    isError,
    data,
    fetchRequest
  };
}
export default useFetch;
