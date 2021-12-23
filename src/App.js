import { useEffect, useState } from "react";
import Counter from "./Counter/Counter";
import useFetch from "./hook/useFetch";
import useTimer from "./hook/useTimer";
import "./styles.css";

export default function App() {
  const { value, startTimer, pauseTimer, resetTimer } = useTimer({
    initialValue: 20
  });
  const [page, setPage] = useState(1);
  const [user, setUser] = useState("");
  const [url, setUrl] = useState("https://api.github.com/search/users");
  const { loading, data, isError, fetchRequest } = useFetch(
    url + `?q=masai&page=${page}`
  );
  console.log(data);
  const handleSearch = () => {
    setUrl(url + `?q=${user}&page=${page}`);
  };

  useEffect(() => {
    fetchRequest();
  }, [url, page]);

  return (
    <div className="App">
      <div
        style={{
          border: "1px solid gray",
          padding: 20,
          background: "black",
          color: "white"
        }}
      >
        <h1>Timer</h1>
        <h2>{value}!</h2>
        <button onClick={startTimer}>START</button>
        <button onClick={pauseTimer}>PAUSE</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
      <Counter />
      <h1>USE FETCH</h1>
      <div>
        <input
          value={user}
          placeholder="Type Users Name for Search"
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
      <div>{loading && "LOADING"}</div>
      <div>
        {!loading &&
          data?.items?.map((item) => (
            <div
              style={{
                border: "1px solid black",
                padding: 10,
                margin: 10,
                background: "cadetblue",
                color: "white"
              }}
              key={item.login}
            >
              {item.login}
            </div>
          ))}
      </div>
      <div>
        {page >= 1 && (
          <button onClick={() => setPage((prev) => prev - 1)}>PREV</button>
        )}
        <button onClick={() => setPage((prev) => prev + 1)}>NEXT</button>
      </div>
    </div>
  );
}
