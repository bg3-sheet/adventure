interface ITitle {
  text: string;
}

function PageTitle({text}: ITitle) {
  return (
    <h1 className="m-0 bg-gradient-to-r from-zinc-100 to-gold bg-clip-text text-6xl font-semibold uppercase leading-none tracking-tighter text-transparent md:text-8xl">
      {text}
    </h1>
  );
}

export default PageTitle;
