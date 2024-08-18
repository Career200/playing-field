export const ShouldRender = ({
  shouldRender,
  children,
}: React.PropsWithChildren<{ shouldRender: boolean }>) => {
  return shouldRender ? <>{children}</> : null;
};
