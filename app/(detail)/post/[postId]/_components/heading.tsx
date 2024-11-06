'use client';

interface Props {
  text: string;
  count: number;
}

const space = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-12',
};

export default function Heading({ text, count }: Props) {
  const replaceText = text.replace(/#/g, '');
  const headingId = text.replace(/#/g, '').trim();
  const scrollToElementById = () => {
    const element = document.getElementById(headingId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={`cursor-pointer text-[15px] text-gray-500 ${
        space[count as 1 | 2 | 3]
      } hover:text-blue-500 min-h-6`}
      onClick={scrollToElementById}
    >
      <p className='break-keep'>{`${replaceText}`}</p>
    </div>
  );
}
