import { Card, CardHeader, CardSizes } from "../components/card";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <Card size={CardSizes.FILL_PAGE}>
      <CardHeader title={t("label_home")} />
    </Card>
  );
};

export { Home };
