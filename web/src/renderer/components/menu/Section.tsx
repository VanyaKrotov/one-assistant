import React from 'react';
import { FlexboxGrid } from 'rsuite';

import { Container, Content, Title } from './styles';

interface SectionProps {
  title: React.ReactNode | string | null;
  additionalButtons?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  additionalButtons,
}) => {
  const renderedTitle = <Title>{title}</Title>;
  const renderedContent = <Content>{children}</Content>;

  if (!additionalButtons) {
    return (
      <Container>
        {renderedTitle}
        {renderedContent}
      </Container>
    );
  }

  return (
    <Container>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item>{renderedTitle}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="hidable">
          {additionalButtons}
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {renderedContent}
    </Container>
  );
};

Section.defaultProps = {
  additionalButtons: null,
};

export default Section;
