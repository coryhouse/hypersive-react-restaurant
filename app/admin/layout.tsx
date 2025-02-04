type Props = {
  children: React.ReactNode;
};

export default function Header(props: Props) {
  return (
    <>
      <h1>Header</h1>
      <main>{props.children}</main>
    </>
  );
}
