import { useEffect, useState } from "react";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { Node, useReactFlow, useStoreApi } from "reactflow";
import "./SearchBar.css";

export function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const debouncedKeyword = useDebouncedValue(keyword, 1000);
  const { addSelectedNodes, getNodes } = useStoreApi().getState();
  const {setCenter, getViewport} = useReactFlow();

  useEffect(() => {
    if (!debouncedKeyword) {
      addSelectedNodes([]);
      return;
    }
    const searchNodeByKeyword = (keyword: string): Node[] => {
      const nodes = getNodes();
      return nodes.filter(
        (node) =>
          node.id.toLocaleLowerCase().indexOf(keyword) >= 0 ||
          node.data.label?.toLocaleLowerCase().indexOf(keyword) >= 0
      );
    };
    const nodes = searchNodeByKeyword(debouncedKeyword);
    addSelectedNodes(nodes.map((node) => node.id));
    if(nodes.length > 0) {
      const {zoom} = getViewport();
      const {x, y} = nodes[0].position;
      setCenter(x, y, {zoom: zoom >= 1.2 ? zoom : 1.2, duration: 600})
    }
  }, [debouncedKeyword, addSelectedNodes, getNodes, getViewport, setCenter]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const keyword = e.currentTarget.value;
    setKeyword(keyword);
  }

  return (
    <div className="search-bar">
      <button
        className="search-bar__icon"
        onClick={() => setOpenSearchInput((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={onChange}
        placeholder="Search by node's id, node's name"
        className={openSearchInput ? "show" : ""}
      />
    </div>
  );
}
