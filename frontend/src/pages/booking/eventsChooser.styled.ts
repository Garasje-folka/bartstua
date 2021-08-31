import styled from "styled-components";

export const Content = styled.div`
  /* Positioning properties */
  width: 100%;
  flex-grow: 1;

  /* Grid properties */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.alignment.margin.LARGE};
  align-content: start;
  justify-content: center;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const Circle = styled.div`
  --radius: 15px;
  height: var(--radius);
  width: var(--radius);
  border-radius: 100%;
`;

export const SelectedCircle = styled(Circle)`
  background: ${({ theme }) => theme.colorPalette.secondary.default};
`;
export const DeselectedCircle = styled(Circle)`
  background: ${({ theme }) => theme.colorPalette.primary.default};
`;

export const Description = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const DescriptionText = styled.div`
  font-weight: ${({ theme }) => theme.text.weight.THIN};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;
