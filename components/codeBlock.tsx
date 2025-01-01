import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  language: string;
  value: string;
}

const customStyle = {
  ...materialOceanic,
  'code[class*="language-"]': {
    ...materialOceanic['code[class*="language-"]'],
    fontSize: '12px',
  },
};

export default function CodeBlock({ language, value }: Props) {
  return (
    <SyntaxHighlighter language={language} style={customStyle}>
      {value}
    </SyntaxHighlighter>
  );
}
