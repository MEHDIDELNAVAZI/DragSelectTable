import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

const App = () => {
  const [isleftarrowdowndown, setisleftarrowdowndown] = useState(null);
  const [isrightarrowdowndown, setisrightarrowdowndown] = useState(null);
  const [startcell, setStartcell] = useState(null);
  const [rightendcell, setrightEndcell] = useState(null);
  const [leftendcell, setleftendcell] = useState(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const data = [
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
  ];
  function stopPropagation(id, event) {
    $(id).on(event, function (e) {
      e.stopPropagation();
      return false;
    });
  }
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);

  const handleScrollref1 = () => {
    const newScrollPosition = table1Ref.current.scrollLeft;
    setScrollPosition(newScrollPosition);

    // Scroll the second table to match the first table's scroll position
    if (table2Ref.current) {
      table2Ref.current.scrollLeft = newScrollPosition;
    }
  };
  const handleScrollref2 = () => {
    const newScrollPosition = table2Ref.current.scrollLeft;
    setScrollPosition(newScrollPosition);

    // Scroll the second table to match the first table's scroll position
    if (table1Ref.current) {
      table1Ref.current.scrollLeft = newScrollPosition;
    }
  };

  const handleMouseEnter = (rowIndex, columnIndex) => {
    if (startcell) {
      if (
        columnIndex >= leftendcell.column &&
        isrightarrowdowndown &&
        rowIndex === startcell.row
      ) {
        setrightEndcell({
          row: rowIndex,
          column: columnIndex,
        });
      } else if (
        rowIndex === startcell.row &&
        columnIndex <= rightendcell.column &&
        isleftarrowdowndown
      ) {
        setleftendcell({
          row: rowIndex,
          column: columnIndex,
        });
      }
    }
  };
  const handlesubmitrange = (e) => {
    setShowModal(true);
    e.stopPropagation();
  };

  const handleMouseup = (rowIndex, columnIndex) => {
    setisleftarrowdowndown(false);
    setisrightarrowdowndown(false);
    const childDiv = document.querySelector(".submitcalenderbox");
    // Access the parent node
    const parentNode = childDiv.parentNode;
  };

  const handleMouseDown = (rowIndex, columnIndex) => {
    setStartcell({
      row: rowIndex,
      column: columnIndex,
    });
    setrightEndcell({
      row: rowIndex,
      column: columnIndex,
    });
    setleftendcell({
      row: rowIndex,
      column: columnIndex,
    });
  };

  useEffect(() => {
    console.log(rightendcell);
    if (rightendcell) {
      const selectedRow = rightendcell.row;
      const selectedColumn = rightendcell.column;
      const selectedCell = document.getElementById(
        `cell-${selectedRow}-${selectedColumn}`
      );
      if (selectedCell) {
        selectedCell.classList.add("highlighted");
      }
      return () => {
        if (selectedCell) {
          selectedCell.classList.remove("highlighted");
        }
      };
    }
  }, [rightendcell]);

  useEffect(() => {
    if (leftendcell) {
      const selectedRow = leftendcell.row;
      const selectedColumn = leftendcell.column;
      const selectedCell = document.getElementById(
        `cell-${selectedRow}-${selectedColumn}`
      );
      if (selectedCell) {
        selectedCell.classList.add("highlighted");
      }
      return () => {
        if (selectedCell) {
          selectedCell.classList.remove("highlighted");
        }
      };
    }
  }, [leftendcell]);

  useEffect(() => {
    if (startcell) {
      $("#selectable-table")
        .find(`tr:eq(${startcell.row}) td:eq(${startcell.column})`)
        .addClass("highlighted");
    }
  }, [startcell]);

  const renderTable = () => {
    return (
      <>
        <div className="flex  w-screen">
          <div
            className="overflow-x-auto  flex  bg-white  ml-10"
            ref={table2Ref}
            onScroll={(e) => {
              handleScrollref2(e);
            }}
            style={{ scrollLeft: scrollPosition }}
          >
            <table id="selectable-table">
              <tbody>
                {data && Array.isArray(data)
                  ? data.map((row, rowIndex) => (
                      <tr key={rowIndex} className="text-[14px]">
                        {row && Array.isArray(row)
                          ? row.map((cell, colIndex) => (
                              <td
                                className={
                                  startcell &&
                                  rightendcell &&
                                  leftendcell &&
                                  colIndex <= rightendcell.column &&
                                  colIndex >= leftendcell.column &&
                                  rowIndex === startcell.row
                                    ? "border-b-1 border-t-1  bg-blue-200 relative "
                                    : "relative no-select "
                                }
                                key={colIndex + rowIndex}
                                onMouseEnter={() =>
                                  handleMouseEnter(rowIndex, colIndex)
                                }
                                onMouseDown={() =>
                                  handleMouseDown(rowIndex, colIndex)
                                }
                                onMouseUp={() =>
                                  handleMouseup(rowIndex, colIndex)
                                }
                                id={`cell-${rowIndex}-${colIndex}`}
                              >
                                {rightendcell &&
                                  colIndex === rightendcell.column &&
                                  rowIndex === rightendcell.row && (
                                    <div
                                      className="absolute left-[calc(100%-7px)] w-[20px] h-[20px] rounded-full bg-blue-500 flex items-center justify-center transform rotate-90 cursor-grab z-10 top-[50%] translate-y-[-50%]"
                                      onMouseDown={(e) => {
                                        e.stopPropagation();
                                        setisrightarrowdowndown(true);
                                      }}
                                      onMouseUp={() => {
                                        setisrightarrowdowndown(false);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="12"
                                        width="12"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                                          fill="white"
                                        />
                                      </svg>
                                    </div>
                                  )}

                                {leftendcell &&
                                  colIndex === leftendcell.column &&
                                  rowIndex === leftendcell.row && (
                                    <div
                                      className="absolute right-[calc(100%-7px)] w-[20px] h-[20px] rounded-full bg-blue-500 flex items-center justify-center transform rotate-90 cursor-grab z-30 top-[50%] translate-y-[-50%]"
                                      onMouseDown={(e) => {
                                        e.stopPropagation();
                                        setisleftarrowdowndown(true);
                                      }}
                                      onMouseUp={() => {
                                        setisleftarrowdowndown(false);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="12"
                                        width="12"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                                          fill="white"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                <div>{cell}</div>
                              </td>
                            ))
                          : null}
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  return <div>{renderTable()}</div>;
};

export default App;
