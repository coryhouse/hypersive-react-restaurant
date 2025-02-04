type Props = {
  children: React.ReactNode;
};

export function Tag(props: Props) {
  return (
    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2">
      {props.children}
    </span>
  );
}
