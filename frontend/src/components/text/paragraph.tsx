interface ParagraphProps {
  type: string;
  children: string;
}

const ParagraphTypes = {
  PARAGRAPH1: "PARAGRAPH1",
};

interface ParagraphComponent extends React.FC<ParagraphProps> {
  types: {
    PARAGRAPH1: string;
  };
}

const Paragraph: ParagraphComponent = (props) => {
  const { children, type } = props;

  return <>{type === ParagraphTypes.PARAGRAPH1 && <p>{children}</p>}</>;
};

Paragraph.types = ParagraphTypes;

export { Paragraph };
