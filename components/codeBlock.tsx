import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface TProps {
  language: string;
  value: string;
}

const customStyle = {
  ...materialOceanic,
  'code[class*="language-"]': {
    ...materialOceanic['code[class*="language-"]'],
    fontSize: '14px',
  },
};

export default function CodeBlock({ language, value }: TProps) {
  return (
    <SyntaxHighlighter language={language} style={customStyle}>
      {value}
    </SyntaxHighlighter>
  );
}
