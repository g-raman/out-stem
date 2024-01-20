const NavBar = () => {
  return (
    <nav className="col-span-2 flex h-min items-center justify-start gap-4 rounded bg-background py-3 text-5xl font-bold">
      <span>
        <img src="../../../public/out-stem.svg" height="50" width="50" />
      </span>
      <span>Slice of Pi</span>
    </nav>
  );
};

export default NavBar;
