/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import editSvg from "../../assets/icons/edit.svg";
import deleteSvg from "../../assets/icons/delete.svg";
import Loader from "../Loader";
import { PhotoView } from "react-photo-view";
import { ensureHttps } from "../../utils/httpsConvert";

// eslint-disable-next-line react/prop-types
export default function Table({
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
}) {
  const [rows, setRows] = useState([]);

  const getItemData = (rowItem, itemKey, headerItem = null) => {
    let keys = itemKey.split(".");
    let item = "";
    let tempItem = { ...rowItem };
    keys.forEach((key, index) => {
      tempItem = tempItem[key];
      item = tempItem;
    });

    let isNew = item ? "Yes" : "No";
    let res = item;
    if (headerItem?.key === "image") {
      res = (
        <div className="flex justify-center items-center cursor-pointer">
          <PhotoView src={ensureHttps(item)}>
            <img src={ensureHttps(item)} alt="" width={50} />
          </PhotoView>
        </div>
      );
    } else if (headerItem?.key === "option") {
      res = (
        <ul className="flex flex-col justify-center items-start pl-2 cursor-pointer space-y-0 py-1">
          {item?.map((option, index) => (
            <>
              <li key={option}>
                {index + 1}. {option}
              </li>
            </>
          ))}
        </ul>
      );
    }

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
      <div className="bg-[#1A393E]/20  m-2 p-2   rounded-md  overflow-x-auto">
        {title && (
          <h5 className="text-center  text-2xl pb-1 font-semibold   section-title  ">
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
                    {actions && (
                      <td className="border-2 border-white table-data-font">
                        <div className="flex gap-2 p-1 justify-center">
                          {actionValue?.edit && (
                            <button
                              className=" py-1 bg-[#2d6eac] px-2 rounded cursor-pointer text-white font-bold tooltip"
                              onClick={() => handleActionClick("edit", item.id)}
                              data-tip="Edit"
                            >
                              <img src={editSvg} alt="" width={25} />
                            </button>
                          )}

                          {actionValue?.delete && (
                            <button
                              className=" py-1 bg-[#e0445e] px-2 rounded cursor-pointer text-white font-bold tooltip"
                              onClick={() =>
                                handleActionClick("delete", item.id)
                              }
                              data-tip="Delete"
                            >
                              <img src={deleteSvg} alt="" width={25} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
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
