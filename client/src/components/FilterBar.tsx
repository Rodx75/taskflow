interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  hideCompleted: boolean;
  onHideCompletedChange: (value: boolean) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  hideCompleted,
  onHideCompletedChange,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__categories">
        <button
          className={`chip ${activeCategory === "All" ? "chip--active" : ""}`}
          onClick={() => onCategoryChange("All")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${activeCategory === c ? "chip--active" : ""}`}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <label className="filter-bar__toggle">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => onHideCompletedChange(e.target.checked)}
        />
        Hide completed
      </label>
    </div>
  );
}
