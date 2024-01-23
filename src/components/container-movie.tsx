interface ContainerMovieProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function ContainerMovie({ title, ...props }: ContainerMovieProps) {
  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6">
      <h1 className="text-xl lg:text-2xl font-semibold">{title}</h1>
      <div {...props} />
    </section>
  );
}
