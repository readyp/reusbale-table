// @ts-nocheck
import React, { useEffect } from "react";
import {
  useGetPostsQuery,
  useLazyGetPostsQuery,
} from "../store/api/post-api-slice";

interface Props {
  source: string;
}

const Table: React.FC<Props> = ({ source }) => {
  const arrayNames = source.split("/");
  const tableContent = arrayNames[arrayNames.length - 1];
  // const { data, isFetching } = useGetPostsQuery(source);
  const [trigger, { data, isFetching }] = useLazyGetPostsQuery();

  useEffect(() => {
    trigger(source);
  }, [source]);

  if (!data || isFetching) {
    return <p>Loading...</p>;
  }

  const tableHeader = data && Object.keys(data[tableContent][0]);

  data && null;
  const tableBody =
    data &&
    data[tableContent].map((content, index) => (
      <tr key={index}>
        {tableHeader?.map((label, index) => (
          <td key={index}>
            {/* Check if is array or string | number */}
            {Array.isArray(content[label]) ? (
              content[label].map((name, index) => (
                <span className="badge m-1" key={index}>
                  {name}
                </span>
              ))
            ) : (
              <span>{JSON.stringify(content[label])}</span>
            )}
          </td>
        ))}
      </tr>
    ));

  // render
  return (
    data && (
      <React.Fragment>
        <h1 className="heading-mega tw-capitalize">Table {tableContent}</h1>
        <table className="table table-striped tw-my-28">
          <thead className="tw-bg-slate-300">
            <tr>
              {tableHeader.map((name, index) => (
                <th className="tw-capitalize tw-text-center" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
        {/* Pagination */}
        <div className="tw-flex tw-justify-end tw-space-x-4 mb-8">
          {Array(Math.ceil(data.total / data.limit))
            .fill(0)
            .map((_, index) => (
              <button
                className={`button ${
                  index === data.skip / data.limit && "button-primary"
                }`}
                onClick={() =>
                  trigger(`${source}?limit=30&skip=${index * data.limit}`)
                }
                key={index}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </React.Fragment>
    )
  );
};

export default Table;
