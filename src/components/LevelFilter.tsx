import { Level } from "../lib/types";
import { levels } from "../lib/data";

interface LevelFilterProps {
  selected: Level | "all";
  onChange: (level: Level | "all") => void;
}

export default function LevelFilter({ selected, onChange }: LevelFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          selected === "all"
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        All Levels
      </button>
      {levels.map((level) => (
        <button
          key={level.slug}
          onClick={() => onChange(level.slug)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            selected === level.slug
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
              : `${level.bgColor} ${level.color} hover:opacity-80`
          }`}
        >
          {level.name}
        </button>
      ))}
    </div>
  );
}
