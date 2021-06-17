import { CardBody, CardContainer, CardHeader } from "../components/card";
import { useTranslation } from "react-i18next";
import { Divider } from "../components/divider";

const About = () => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <CardHeader title={t("label_about_us")} />
      <CardBody> 
        <img src={process.env.PUBLIC_URL + "/saunatestimg.jpeg"} width="300" alt="Image of a man in a sauna"/>
        <h5>Concept Behind BartStua</h5>
          <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          </p>
        <Divider/>

        <h5>Founding Story</h5>
          <p>
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          </p>
          <Divider/>

        <h5>Sales Pitch</h5>
          <p>
          Curabitur vel volutpat dolor. Integer ultrices dapibus porta. Maecenas feugiat, est facilisis pharetra bibendum, ligula elit tempor sem, sed feugiat odio nisi eu augue. Proin ut commodo sapien. Quisque mollis justo tempor tincidunt tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi feugiat lacus magna, sodales aliquam ex iaculis a. Curabitur pellentesque at arcu eget semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sed libero non diam aliquet luctus a eu lectus. In aliquet sapien scelerisque orci finibus dictum. Donec pulvinar sodales metus vel consequat. Cras efficitur ultricies finibus. Vivamus pulvinar, lorem pharetra pharetra interdum, quam mauris ornare eros, et finibus est arcu eu metus.
          </p>
          <Divider/>
      
      </CardBody>
    </CardContainer>
  );
};

export { About };
