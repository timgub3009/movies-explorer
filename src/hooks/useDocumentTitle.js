import React from "react";

function useDocumentTitle(title) {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
