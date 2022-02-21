import { FC, useEffect, useRef } from 'react';

interface TitleProps {
  title?: string | null;
  children: React.ReactNode;
}

const Title: FC<TitleProps> = ({ title, children }) => {
  const savedTitle = useRef<string>(document.title);

  useEffect(() => {
    document.title = title || '';

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.title = savedTitle.current;
    };
  }, [title]);

  return <>{children}</>;
};

Title.defaultProps = {
  title: '',
};

export default Title;
