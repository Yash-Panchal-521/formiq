// components/LogoMark.tsx
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

type Props = {
  size?: number;
  bg?: string; // background color
  fg?: string; // foreground F color
  radius?: number;
};

export default function LogoMark({
  size = 112,
  bg = "#FFFFFF",
  fg = "#0B1F35",
  radius = 24,
}: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 112 112"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Rounded square background */}
      <Rect x={0} y={0} width={112} height={112} rx={radius} fill={bg} />

      {/* Stylized italic F */}
      <Path
        d="
          M34 86
          L44 26
          H82
          L80 38
          H54
          L52 50
          H74
          L72 62
          H50
          L47 86
          Z
        "
        fill={fg}
      />
    </Svg>
  );
}
