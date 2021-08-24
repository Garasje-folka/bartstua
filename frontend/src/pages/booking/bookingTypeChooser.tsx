import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "../../icons";
import {
  BookingTypeChooserWrapper,
  Divider,
  OptionWrapper,
  OptionIcon,
  Price,
  TextDescription,
  TextHeader,
  TextWrapper,
} from "./bookingTypeChooser.styled";

export type BookingTypeChooserProps = {
  className?: string;
};

const BookingTypes = {
  DROP_IN: "DROP_IN",
  FULL_SAUNA: "FULL_SAUNA",
} as const;

type BookingType = typeof BookingTypes[keyof typeof BookingTypes];

export const BookingTypeChooser: React.FC<BookingTypeChooserProps> = (
  props: BookingTypeChooserProps
) => {
  const { className } = props;
  const { t } = useTranslation();

  const [selectedBookingType, setSelectedBookingType] =
    useState<BookingType | null>();

  const Option = ({
    title,
    description,
    price,
    icon,
    bookingType,
  }: {
    title: string;
    description: string;
    price: string;
    icon: IconType;
    bookingType: BookingType;
  }) => (
    <OptionWrapper
      highlighted={selectedBookingType === bookingType}
      onClick={() => setSelectedBookingType(bookingType)}
    >
      <OptionIcon icon={icon} />
      <TextWrapper>
        <TextHeader>{title}</TextHeader>
        <TextDescription>{description}</TextDescription>
      </TextWrapper>
      <Divider />
      <Price>{price}</Price>
    </OptionWrapper>
  );

  return (
    <BookingTypeChooserWrapper className={className}>
      <Option
        title={t("label_book_full_sauna")}
        description={t("text_description_book_full_sauna")}
        icon={IconType.GroupIcon}
        price="899 kr"
        bookingType={BookingTypes.FULL_SAUNA}
      />
      <Option
        title={t("label_book_drop_in")}
        description={t("text_description_book_drop_in")}
        icon={IconType.GroupIcon}
        price="Fra 199 kr"
        bookingType={BookingTypes.DROP_IN}
      />
    </BookingTypeChooserWrapper>
  );
};
