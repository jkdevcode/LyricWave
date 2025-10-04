import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};
