import React, { useRef, useEffect } from "react";
import "./CodeOutput.style.css";
interface CodeOutputProps {
  err: string;
  code: string;
  loading: boolean;
}

export const CodeOutput = ({ err, code, loading }: CodeOutputProps) => {
  const iframeRef = useRef<any>();
  const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code, html]);

  return (
    <div className="iframe-wrapper">
      <iframe
        ref={iframeRef}
        title="output"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {loading && (
        <div className="progress-bar-wrapper">
          <progress className="progress-bar"> ... Loading</progress>
        </div>
      )}
      {err && <div className="bundle-error">{err}</div>}
    </div>
  );
};
