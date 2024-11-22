'use client';

interface Props {
  text: string;
  isActive: boolean;
  id: string;
}

const space = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-12',
};

export default function Heading({ text, isActive, id }: Props) {
  const replaceText = text.replace(/#/g, '');
  const countSpace = (heading: string) => {
    const matches = heading.match(new RegExp('#', 'g'));
    return matches ? matches.length : 0;
  };

  const scrollToElementById = () => {
    const element = document.getElementById(id);
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
      className={`cursor-pointer text-[15px] ${
        space[countSpace(text) as 1 | 2 | 3]
      } hover:text-blue-500 ${
        isActive ? 'text-blue-500' : 'text-gray-500'
      } min-h-6`}
      onClick={scrollToElementById}
    >
      <p className='break-keep'>{`${replaceText}`}</p>
    </div>
  );
}
