import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { EyeIcon } from "@/components/icons";
import { useLyricMode } from "@/contexts/lyric-mode";

export default function LyricSwitch() {
  const { mode, setMode } = useLyricMode();

  return (
    <Tooltip content="Lyrics Mode" delay={750}>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              aria-label="Lyrics Mode"
              className="text-default-500 hover:bg-default-100 transition-all duration-200"
              variant="light"
            >
              <EyeIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Lyrics Mode Selection"
            onAction={(key) => setMode(key as "phrases" | "words")}
          >
            <DropdownItem key="phrases" textValue="Phrases">
              <div
                className={`${mode === "phrases" ? "text-primary" : "text-default-600"} w-full flex items-center justify-between pointer-events-none`}
              >
                <span>Phrases</span>
                <span className="text-tiny">PH</span>
              </div>
            </DropdownItem>
            <DropdownItem key="words" textValue="Words">
              <div
                className={`${mode === "words" ? "text-primary" : "text-default-600"} w-full flex items-center justify-between pointer-events-none`}
              >
                <span>Words</span>
                <span className="text-tiny">WO</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Tooltip>
  );
}
