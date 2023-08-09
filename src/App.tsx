import React, { useState } from "react";
import Table from "./components/Table";
import postApiSlice from "./store/api/post-api-slice";
import { useDispatch } from "react-redux";
interface Props {}

const App: React.FC<Props> = () => {
  /*
   * for debugging purpose only;
   * using lazy queries
   * it make easier to make request different endpoint
   */
  const [url, setUrl] = useState<string>("https://dummyjson.com/posts");
  const [endpoint, setEndPoint] = useState<string>(url);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEndPoint(url);
    dispatch(postApiSlice.util.resetApiState());
  };
  // render
  return (
    <div className="tw-container tw-mx-auto">
      <section className="tw-mb-28">
        <h2 className="heading-mega tw-mb-4">Reusable Table</h2>
        <p className="tw-italic">Bagaimana cara menggunakan nya?</p>
        <ol>
          <li>Tempelkan URL Endpoint.</li>
          <li>
            Hanya response dengan format seperti ini yang bisa di proses:
            <span className="tw-block tw-font-bold">
              <p>[key: string]: object[],</p>
              <p>limit: number,</p>
              <p>skip: number,</p>
              <p>total: number</p>
            </span>
          </li>
          <li>
            contoh endpoint:
            <ul>
              <li>https://dummyjson.com/posts</li>
              <li>https://dummyjson.com/products</li>
              <li>https://dummyjson.com/comments</li>
              <li>https://dummyjson.com/users</li>
            </ul>
          </li>
        </ol>
      </section>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <span className="tw-block tw-font-bold">Endpoint URL</span>
            <input
              className="tw-px-8 tw-py-4 tw-rounded"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </fieldset>
      </form>
      {endpoint && <Table source={endpoint} />}
    </div>
  );
};

export default App;
