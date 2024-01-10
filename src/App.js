import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
var App = function () {
    var _a = useState(null), isleftarrowdowndown = _a[0], setisleftarrowdowndown = _a[1];
    var _b = useState(null), isrightarrowdowndown = _b[0], setisrightarrowdowndown = _b[1];
    var _c = useState(null), startcell = _c[0], setStartcell = _c[1];
    var _d = useState(null), rightendcell = _d[0], setrightEndcell = _d[1];
    var _e = useState(null), leftendcell = _e[0], setleftendcell = _e[1];
    var _f = useState(0), scrollPosition = _f[0], setScrollPosition = _f[1];
    var data = [
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
    var table1Ref = useRef(null);
    var table2Ref = useRef(null);
    var handleScrollref1 = function () {
        var newScrollPosition = table1Ref.current.scrollLeft;
        setScrollPosition(newScrollPosition);
        // Scroll the second table to match the first table's scroll position
        if (table2Ref.current) {
            table2Ref.current.scrollLeft = newScrollPosition;
        }
    };
    var handleScrollref2 = function () {
        var newScrollPosition = table2Ref.current.scrollLeft;
        setScrollPosition(newScrollPosition);
        // Scroll the second table to match the first table's scroll position
        if (table1Ref.current) {
            table1Ref.current.scrollLeft = newScrollPosition;
        }
    };
    var handleMouseEnter = function (rowIndex, columnIndex) {
        if (startcell) {
            if (columnIndex >= leftendcell.column &&
                isrightarrowdowndown &&
                rowIndex === startcell.row) {
                setrightEndcell({
                    row: rowIndex,
                    column: columnIndex,
                });
            }
            else if (rowIndex === startcell.row &&
                columnIndex <= rightendcell.column &&
                isleftarrowdowndown) {
                setleftendcell({
                    row: rowIndex,
                    column: columnIndex,
                });
            }
        }
    };
    var handlesubmitrange = function (e) {
        setShowModal(true);
        e.stopPropagation();
    };
    var handleMouseup = function (rowIndex, columnIndex) {
        setisleftarrowdowndown(false);
        setisrightarrowdowndown(false);
        var childDiv = document.querySelector(".submitcalenderbox");
        // Access the parent node
        var parentNode = childDiv.parentNode;
    };
    var handleMouseDown = function (rowIndex, columnIndex) {
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
    useEffect(function () {
        console.log(rightendcell);
        if (rightendcell) {
            var selectedRow = rightendcell.row;
            var selectedColumn = rightendcell.column;
            var selectedCell_1 = document.getElementById("cell-".concat(selectedRow, "-").concat(selectedColumn));
            if (selectedCell_1) {
                selectedCell_1.classList.add("highlighted");
            }
            return function () {
                if (selectedCell_1) {
                    selectedCell_1.classList.remove("highlighted");
                }
            };
        }
    }, [rightendcell]);
    useEffect(function () {
        if (leftendcell) {
            var selectedRow = leftendcell.row;
            var selectedColumn = leftendcell.column;
            var selectedCell_2 = document.getElementById("cell-".concat(selectedRow, "-").concat(selectedColumn));
            if (selectedCell_2) {
                selectedCell_2.classList.add("highlighted");
            }
            return function () {
                if (selectedCell_2) {
                    selectedCell_2.classList.remove("highlighted");
                }
            };
        }
    }, [leftendcell]);
    useEffect(function () {
        if (startcell) {
            $("#selectable-table")
                .find("tr:eq(".concat(startcell.row, ") td:eq(").concat(startcell.column, ")"))
                .addClass("highlighted");
        }
    }, [startcell]);
    var renderTable = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex  w-screen" },
                React.createElement("div", { className: "overflow-x-auto  flex  bg-white  ml-10", ref: table2Ref, onScroll: function (e) {
                        handleScrollref2(e);
                    }, style: { scrollLeft: scrollPosition } },
                    React.createElement("table", { id: "selectable-table" },
                        React.createElement("tbody", null, data && Array.isArray(data)
                            ? data.map(function (row, rowIndex) { return (React.createElement("tr", { key: rowIndex, className: "text-[14px]" }, row && Array.isArray(row)
                                ? row.map(function (cell, colIndex) { return (React.createElement("td", { className: startcell &&
                                        rightendcell &&
                                        leftendcell &&
                                        colIndex <= rightendcell.column &&
                                        colIndex >= leftendcell.column &&
                                        rowIndex === startcell.row
                                        ? "border-b-1 border-t-1  bg-blue-200 relative "
                                        : "relative no-select ", key: colIndex + rowIndex, onMouseEnter: function () {
                                        return handleMouseEnter(rowIndex, colIndex);
                                    }, onMouseDown: function () {
                                        return handleMouseDown(rowIndex, colIndex);
                                    }, onMouseUp: function () {
                                        return handleMouseup(rowIndex, colIndex);
                                    }, id: "cell-".concat(rowIndex, "-").concat(colIndex) },
                                    rightendcell &&
                                        colIndex === rightendcell.column &&
                                        rowIndex === rightendcell.row && (React.createElement("div", { className: "absolute left-[calc(100%-7px)] w-[20px] h-[20px] rounded-full bg-blue-500 flex items-center justify-center transform rotate-90 cursor-grab z-10 top-[50%] translate-y-[-50%]", onMouseDown: function (e) {
                                            e.stopPropagation();
                                            setisrightarrowdowndown(true);
                                        }, onMouseUp: function () {
                                            setisrightarrowdowndown(false);
                                        } },
                                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 448 512" },
                                            React.createElement("path", { d: "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z", fill: "white" })))),
                                    leftendcell &&
                                        colIndex === leftendcell.column &&
                                        rowIndex === leftendcell.row && (React.createElement("div", { className: "absolute right-[calc(100%-7px)] w-[20px] h-[20px] rounded-full bg-blue-500 flex items-center justify-center transform rotate-90 cursor-grab z-30 top-[50%] translate-y-[-50%]", onMouseDown: function (e) {
                                            e.stopPropagation();
                                            setisleftarrowdowndown(true);
                                        }, onMouseUp: function () {
                                            setisleftarrowdowndown(false);
                                        } },
                                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 448 512" },
                                            React.createElement("path", { d: "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z", fill: "white" })))),
                                    React.createElement("div", null, cell))); })
                                : null)); })
                            : null))))));
    };
    return React.createElement("div", null, renderTable());
};
export default App;
