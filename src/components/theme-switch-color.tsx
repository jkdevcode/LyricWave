import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { useColorTheme } from "@/hooks/use-color-theme";
import { HerouiColor } from "@/theme/theme.config";
import { PaletteIcon } from "@/components/icons";

export const ThemeColorSwitch = () => {
  const { appColor, setAppColor } = useColorTheme();

  const colors: HerouiColor[] = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];

  return (
    <Tooltip content="Colors Mode" delay={750}>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              aria-label="Cambiar color del tema"
              variant="light"
            >
              <PaletteIcon className={`text-${appColor}`} size={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Seleccionar color de tema"
            selectedKeys={new Set([appColor])}
            selectionMode="single"
            onAction={(key) => setAppColor(key as HerouiColor)}
          >
            {colors.map((color) => (
              <DropdownItem key={color} className="capitalize">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-${color}`} />
                  {color}
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Tooltip>
  );
};
