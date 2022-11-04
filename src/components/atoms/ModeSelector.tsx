import React, { FunctionComponent, useEffect, useState } from "react";
import {
  mdiFormatListBulleted,
  mdiDotsGrid,
  mdiAccountPlusOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import "../../assets/styles/mode-selector.scss";

interface IModeSelectorProps {
  collectionTitle: string;
  onModeSelect?: (mode: "grid" | "list") => void;
  onNewUserClick?: () => void;
  selected: "grid" | "list";
}

const ModeSelector: FunctionComponent<IModeSelectorProps> = ({
  collectionTitle,
  onModeSelect,
  onNewUserClick,
  selected,
}) => {
  const [selectedMode, setSelectedMode] = useState(selected);

  const handleModeChange = (mode: "grid" | "list") => {
    setSelectedMode(mode);
    if (onModeSelect) onModeSelect(mode);
  };

  useEffect(() => {
    setSelectedMode(selected);
  }, [selected]);

  return (
    <div className="mode-selector">
      <div>
        <h1>{collectionTitle}</h1>
      </div>
      <div>
        <button type="button" className="new-user-btn" onClick={onNewUserClick}>
          <Icon size={1} path={mdiAccountPlusOutline} />
          Create new user
        </button>
        <button
          type="button"
          title="Grid mode"
          onClick={() => handleModeChange("grid")}
          className={selectedMode === "grid" ? "selected-button" : ""}
        >
          <Icon size={1} path={mdiDotsGrid} />
        </button>
        <button
          type="button"
          title="List mode"
          onClick={() => handleModeChange("list")}
          className={selectedMode === "list" ? "selected-button" : ""}
        >
          <Icon size={1} path={mdiFormatListBulleted} />
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
