export default function BlankPage() {
  return (
    <div className="flex flex-col">
      <div className="flex align-middle flex-row justify-center">
        <img
          className="h-12 w-12 rounded-xl object-cover"
          src="/yottabyte-mark.svg"
          alt="YOTTABYTE logo"
        />
        <h1 className="text-2xl ml-2 mt-3 font-extrabold text-green-600">
          YOTTABYTE
        </h1>
      </div>
      <h1 className="font-bold text-xl text-center">
        Welcome to YOTTABYTE! Your support workspace is ready.
      </h1>
    </div>
  );
}
