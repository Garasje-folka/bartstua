import {
  FaMinus,
  FaPlus,
  FaSignInAlt,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { AnyStyledComponent } from "styled-components";
import { generateStyledIcon } from "./icon.styled";

export enum IconType {
  SignOutIcon = "SignOutIcon",
  LeftArrow = "LeftArrow",
  RightArrow = "RightArrow",
  PlusSign = "PlusSign",
  MinusSign = "MinusSign",
}

const getIcon = (iconType: IconType) => {
  switch (iconType) {
    case IconType.LeftArrow: {
      return FaAngleLeft;
    }
    case IconType.RightArrow: {
      return FaAngleRight;
    }
    case IconType.SignOutIcon: {
      return FaSignInAlt;
    }
    case IconType.PlusSign: {
      return FaPlus;
    }
    case IconType.MinusSign: {
      return FaMinus;
    }
  }
};

type Props = {
  icon: IconType;
  height?: string;
  width?: string;
};

const Icon: React.FC<Props> = (props: Props) => {
  const { icon, height, width } = props;
  const OriginalIcon = getIcon(icon);
  const StyledOriginalIcon = generateStyledIcon(
    OriginalIcon as AnyStyledComponent
  );
  return <StyledOriginalIcon height={height} width={width} />;
};

export { Icon };
export type { Props as IconProps };
