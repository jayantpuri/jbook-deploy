import React, { useState, useEffect, useRef } from "react";
import MarkdownEditor from "@uiw/react-md-editor";
import { useCellDispatch } from "../../Hooks/useCombineDispatch";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import "./TextEditor.style.css";
import ActionBar from "../ActionBar/ActionBar.component";
import { Cell } from "../../Redux/Types/CellTypes";

interface textEditorProps {
  cell: Cell;
}

export const TextEditor = ({ cell }: textEditorProps) => {
  const { updateCell } = useCellDispatch();
  const cellContent = useTypedSelector((state) => {
    return state.CellReducer.cells[cell.id].content;
  });

  const [visible, setVisible] = useState<boolean>(false);
  const markdownRef = useRef<any>();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (markdownRef.current && markdownRef.current.contains(event.target)) {
        return;
      }
      setVisible(false);
    };
    window.addEventListener("click", listener, { capture: true });

    return () => {
      window.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div className="text-editor-wrapper">
      <ActionBar id={cell.id} />
      {visible ? (
        <div className="text-editor" ref={markdownRef}>
          <MarkdownEditor
            ref={markdownRef}
            value={cellContent}
            onChange={(value) => updateCell(cell.id, value || "")}
          />
        </div>
      ) : (
        <div className="text-editor preview" onClick={() => setVisible(true)}>
          <MarkdownEditor.Markdown source={cellContent || "Click to edit"} />
        </div>
      )}
    </div>
  );
};
