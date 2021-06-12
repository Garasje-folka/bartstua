import { CardContainer, CardHeader } from "../components/card";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <CardContainer>
      <CardHeader title={t("label_home")} />
    </CardContainer>
  );
};

export { Home };
