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

const Heading: React.FC<HeadingProps> = (props) => {
  const { children, type } = props;

  return (
    <>
      {type === HeadingTypes.HEADING1 && <h1>{children}</h1>}
      {type === HeadingTypes.HEADING2 && <h2>{children}</h2>}
      {type === HeadingTypes.HEADING3 && <h3>{children}</h3>}
      {type === HeadingTypes.HEADING4 && <h4>{children}</h4>}
    </>
  );
};

export { Heading, HeadingTypes };
