import * as React from "react";
import Svg, { SvgProps, Rect, Path, Mask } from "react-native-svg";
const RecsIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={55} height={75} fill="#15182D" rx={10} />
    <Path
      fill="#15182D"
      d="M57 5a9 9 0 0 1 9 9v46a9 9 0 0 1-9 9V5ZM68 11a7 7 0 0 1 7 7v39a7 7 0 0 1-7 7V11Z"
    />
    <Mask id="a" fill="white">
      <Rect width={18} height={33} x={19.5} y={21} rx={1} />
    </Mask>
    <Rect
      width={18}
      height={33}
      x={19.5}
      y={21}
      stroke="white"
      strokeWidth={6}
      mask="url(#a)"
      rx={1}
    />
    <Path stroke="white" strokeWidth={3} d="M20.5 31.5h16M19.5 41.5h16" />
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeMiterlimit={4.62}
      strokeWidth={3}
      d="M14 53V22"
    />
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeWidth={3}
      d="M42.5 53V22"
    />
    <Path
      stroke="white"
      strokeWidth={4}
      d="M15.5 24h5M15.5 30h5M15.5 36h5M15.5 43h5M14.5 49h5M37.5 24h5M37.5 30h5M37.5 36h5M37.5 43h5M36.5 49h5"
    />
  </Svg>
);
export default RecsIcon;
