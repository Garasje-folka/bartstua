import {
  FaMinus,
  FaPlus,
  FaSignInAlt,
  FaAngleLeft,
  FaAngleRight,
  FaEnvelope,
  FaKey,
  FaLockOpen,
  FaUser,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

export enum IconType {
  SignOutIcon,
  LeftArrow,
  RightArrow,
  PlusSign,
  MinusSign,
  EmailIcon,
  PasswordIcon,
  SignInIcon,
  SignUpIcon,
  CartIcon,
  GroupIcon,
  SinglePersonIcon,
}

const getIcon = (iconType: IconType) => {
  switch (iconType) {
    case IconType.LeftArrow:
      return FaAngleLeft;
    case IconType.RightArrow:
      return FaAngleRight;
    case IconType.SignOutIcon:
      return FaSignInAlt;
    case IconType.PlusSign:
      return FaPlus;
    case IconType.MinusSign:
      return FaMinus;
    case IconType.EmailIcon:
      return FaEnvelope;
    case IconType.PasswordIcon:
      return FaKey;
    case IconType.SignInIcon:
      return FaLockOpen;
    case IconType.SignUpIcon:
      return FaUser;
    case IconType.CartIcon:
      return FaShoppingCart;
    case IconType.GroupIcon:
      return FaUsers;
    case IconType.SinglePersonIcon:
      return FaUser;
  }
};

type Props = {
  icon: IconType;
  height?: string;
  width?: string;
  className?: string;
};

const Icon: React.FC<Props> = (props: Props) => {
  const { icon, height, width, className } = props;
  const OriginalIcon = getIcon(icon);

  return <OriginalIcon height={height} width={width} className={className} />;
};

export { Icon };
export type { Props as IconProps };
