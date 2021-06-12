import { CardContainer, CardHeader } from "../components/card";
import { useTranslation } from "react-i18next";

const Booking = () => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <CardHeader title={t("label_booking")} />
    </CardContainer>
  );
};

export { Booking };
