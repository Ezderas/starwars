type Props = {
  selection: any;
  handleClick: any;
  className: string;
  content: string;
};

export default function UserButtonClick({
  selection,
  handleClick,
  className,
  content,
}: Props) {
  return (
    <>
      <button className={className} onClick={() => handleClick(selection)}>
        {content}
      </button>
    </>
  );
}
