import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  name: string;
  render: ReactNode;
}

interface StTabsProps {
  tabList: Tab[];
  defaultTab?: string;
  tab: string;
  onChange: (id: string) => void;
}

const StTabs = ({ tabList, tab, onChange }: StTabsProps) => {
  const currentTab = tabList.find((t) => t.id === tab);

  return (
    <>
      <div className="flex flex-row gap-4">
        {tabList.map((t) => (
          <button
            key={t.id}
            className={cn(
              "cursor-pointer",
              t.id == tab ? "font-bold border-b-2 border-primary" : "",
            )}
            onClick={() => onChange(t.id)}>
            {t.name}
          </button>
        ))}
      </div>
      {currentTab?.render}
    </>
  );
};

export default StTabs;
