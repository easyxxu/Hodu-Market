import * as icons from "../../assets/svg";

type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as any[];

export type IconProps = {
  /** 아이콘 타입 설정 */
  icon: IconType;
  className?: string;
};

const Icon = ({ icon, className }: IconProps) => {
  const SVGIcon = icons[icon];
  return <SVGIcon className={className} />;
};

export default Icon;
