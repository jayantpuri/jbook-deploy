import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./Reducers/MainReducer";
import { ACTION_TYPES } from "./ActionTypes/CellActionTypes";

export const store = legacy_createStore(reducer, {}, applyMiddleware(thunk));

export * as CellActionCreators from "./ActionCreators/CellActionCreator";
export * as BundleActionCreators from "./ActionCreators/BundleActionCreator";

let codeContent =
  "import React, { useState } from \"react\";\r\n\r\nfunction App() {\r\n  const [count, setCount] = useState(0);\r\n  const [inp, setInp] = useState('hello')\r\n\r\n  function increment() {\r\n    setCount((prevCount) => prevCount + 1);\r\n  }\r\n\r\n  function decrement() {\r\n    setCount((prevCount) => prevCount - 1);\r\n  }\r\n\r\n  function double() {\r\n    setCount((prevCount) => prevCount * 2);\r\n  }\r\n\r\n  return (\r\n    <div>\r\n      <h1>{count}</h1>\r\n      <button onClick={increment}>Increment</button>\r\n      <button onClick={decrement}>Decrement</button>\r\n      <button onClick={double}>Double</button>\r\n    </div>\r\n  );\r\n}\r\n\r\nshow(<App />)";

let textContent =
  "This is an interactive coding environment. You can code and execute React components and document your code using markdown editor like this one!\r\n\r\nFeatures\r\n1) Click any text/code cell (like this one) to edit it.\r\n2) You can add either a code or a text cell by clicking on the 'code' or 'text' buttons.\r\n3) You can see the output of your code in real time on the output window that is attached to the code cell.\r\n4) You can document your code using the markdown.\r\n5) You can import CSS or React libraries in your code cells.\r\n6) You can delete code cells and text cells by pressing \"X\" button (on the top right corner of the cell).\r\n7) You can move your code or text cells with the help of arrow buttons.\r\n8) You can show any React component, string or anything else by using the show() function. This is an inbuilt function of this app. You can call show() multiple times to show multiple values.\r\n";

store.dispatch({
  type: ACTION_TYPES.ADD_CELL_AFTER,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ACTION_TYPES.ADD_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});

const {
  CellReducer: { order },
} = store.getState();
const codeId = order[1];
const textId = order[0];

store.dispatch({
  type: ACTION_TYPES.UPDATE_CELL,
  payload: {
    id: textId,
    content: textContent,
  },
});

store.dispatch({
  type: ACTION_TYPES.UPDATE_CELL,
  payload: {
    id: codeId,
    content: codeContent,
  },
});
