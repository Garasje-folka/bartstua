import { CardContainer, CardHeader } from "../components/card";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <CardHeader title={t("label_about_us")} />
    </CardContainer>
  );
};

export { About };
