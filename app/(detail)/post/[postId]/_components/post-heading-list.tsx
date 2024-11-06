import Heading from './heading';

interface Props {
  content: string;
}

export default function PostHeadingList({ content }: Props) {
  const headingList = content.match(/^(#{1,3}\s.*)$/gm) || [];
  const countSpace = (heading: string) => {
    const matches = heading.match(new RegExp('#', 'g'));
    return matches ? matches.length : 0;
  };

  return (
    <div className='hidden fixed top-40 left-1/2 translate-x-[420px] h-fit lg:flex w-60'>
      <ul className='flex flex-col gap-0.5'>
        {headingList.map((item, index) => (
          <li key={index} className='w-fit'>
            <Heading text={item} count={countSpace(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
