import { Heading1 } from "./heading.styled";

interface HeadingProps {
  type: string;
  children: string | string[];
}

const HeadingTypes = {
  HEADING1: "HEADING1",
  HEADING2: "HEADING2",
  HEADING3: "HEADING3",
  HEADING4: "HEADING4",
};

interface HeadingComponent extends React.FC<HeadingProps> {
  types: {
    HEADING1: string;
    HEADING2: string;
    HEADING3: string;
    HEADING4: string;
  };
}

const Heading: HeadingComponent = (props) => {
  const { children, type } = props;

  return (
    <>
      {type === HeadingTypes.HEADING1 && <Heading1>{children}</Heading1>}
      {type === HeadingTypes.HEADING2 && <h2>{children}</h2>}
      {type === HeadingTypes.HEADING3 && <h3>{children}</h3>}
      {type === HeadingTypes.HEADING4 && <h4>{children}</h4>}
    </>
  );
};

Heading.types = HeadingTypes;

export { Heading };
