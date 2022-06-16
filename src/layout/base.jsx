import AppNavigation from "./navbar";

export default function BaseLayout(props) {
  return (
    <>
      <AppNavigation />
      {props.children}
    </>
  );
}
