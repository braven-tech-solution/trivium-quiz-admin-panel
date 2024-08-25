/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";

import Loader from "../../../components/Loader";
import { PhotoView } from "react-photo-view";
import { ensureHttps } from "../../../utils/httpsConvert";

// eslint-disable-next-line react/prop-types
function DataShowTable(
  {
    title,
    headers,
    data,
    actions,
    actionName,
    handleActionClick = () => {},
    actionValue = {
      edit: false,
      delete: false,
    },
  },
  ref
) {
  const [rows, setRows] = useState([]);

  const getItemData = (rowItem, itemKey, headerItem = null) => {
    let keys = itemKey.split(".");
    let item = "";
    let tempItem = { ...rowItem };
    keys.forEach((key, index) => {
      tempItem = tempItem[key];
      item = tempItem;
    });

    let res =
      headerItem?.key === "description" ? (
        <div className=" w-80">{item}</div>
      ) : (
        item
      );

    return res;
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  // data === undefined
  if (!data) {
    return <Loader />;
  } else {
    return (
      <div
        className="bg-[#1A393E]/20  m-2 p-2   rounded-md  overflow-x-auto"
        ref={ref}
      >
        {title && (
          <h5 className="text-center  text-2xl font-semibold   section-title  ">
            {title}
          </h5>
        )}

        <div className="bg-[#CCBFB0]   rounded-sm">
          <div className=" ">
            <table className="w-[100%]    ">
              <thead>
                {/* <tr className="sticky top-0"> */}
                <tr className=" bg-[#CCBFB0] ">
                  <th className=" bg-customBase  border-2 border-white table-header-font">
                    SL No
                  </th>

                  {headers?.map((item, index) => (
                    <th
                      className=" bg-customBase border-2 border-white px-1 table-header-font"
                      key={index}
                    >
                      {item?.name}
                    </th>
                  ))}
                  {actionName && (
                    <th className="border-2 border-white bg-customBase px-1 table-header-font">
                      {actionName}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 !== 0 ? "bg-[#a69078] " : "bg-[#70706f] "
                    }  `}
                  >
                    <td className="h-[30px] border-2 border-white table-data-font text-center">
                      {index + 1}
                    </td>
                    {headers.map((x, index) => (
                      <td
                        className="border-2 border-white table-data-font text-center px-1"
                        key={index}
                      >
                        {getItemData(item, x.key, x) ?? "Unavailable"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const forwardTable = React.forwardRef(DataShowTable);

export default forwardTable;
