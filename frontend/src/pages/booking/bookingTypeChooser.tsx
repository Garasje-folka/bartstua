import { useEffect } from "react";
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
  CounterWrapper,
  animationTimeMs,
} from "./bookingTypeChooser.styled";
import { SpacesCounter } from "./spacesCounter";

export type BookingTypeChooserProps = {
  className?: string;
  spaces: number;
  setSpaces: React.Dispatch<React.SetStateAction<number>>;
  wholeSauna: boolean;
  setWholeSauna: React.Dispatch<React.SetStateAction<boolean>>;
  saunaCapacity: number;
};

const BookingTypes = {
  DROP_IN: "DROP_IN",
  FULL_SAUNA: "FULL_SAUNA",
} as const;

type BookingType = typeof BookingTypes[keyof typeof BookingTypes];

export const BookingTypeChooser: React.FC<BookingTypeChooserProps> = (
  props: BookingTypeChooserProps
) => {
  const { className, setSpaces, spaces, setWholeSauna, saunaCapacity } = props;
  const { t } = useTranslation();

  const [selectedBookingType, setSelectedBookingType] =
    useState<BookingType | null>();
  const [showingDropInStage, setShowingDropInStage] = useState<boolean>(false);

  const startDropInAnimation = selectedBookingType === BookingTypes.DROP_IN;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowingDropInStage(startDropInAnimation);
      setSpaces(1);
    }, animationTimeMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [startDropInAnimation, setShowingDropInStage, setSpaces]);

  useEffect(() => {
    setWholeSauna(selectedBookingType === BookingTypes.FULL_SAUNA);
  }, [selectedBookingType, setWholeSauna]);

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
      <TextWrapper highlighted={selectedBookingType === bookingType}>
        <TextHeader>{title}</TextHeader>
        <TextDescription isDropIn={showingDropInStage}>
          {description}
        </TextDescription>
      </TextWrapper>
      <Divider isDropIn={showingDropInStage} />
      <Price isDropIn={showingDropInStage}>{price}</Price>
    </OptionWrapper>
  );

  return (
    <>
      <BookingTypeChooserWrapper
        className={className}
        isDropIn={showingDropInStage}
        startDropInAnimation={startDropInAnimation}
      >
        <Option
          title={t(
            showingDropInStage
              ? "label_book_full_sauna_short_form"
              : "label_book_full_sauna"
          )}
          description={t("text_description_book_full_sauna")}
          icon={IconType.GroupIcon}
          price="899 kr"
          bookingType={BookingTypes.FULL_SAUNA}
        />
        <Option
          title={t("label_book_drop_in")}
          description={t("text_description_book_drop_in")}
          icon={IconType.SinglePersonIcon}
          price="Fra 199 kr"
          bookingType={BookingTypes.DROP_IN}
        />
      </BookingTypeChooserWrapper>
      {showingDropInStage && (
        <CounterWrapper>
          <SpacesCounter
            setSpaces={setSpaces}
            spaces={spaces}
            saunaCapacity={saunaCapacity}
          />
        </CounterWrapper>
      )}
    </>
  );
};
