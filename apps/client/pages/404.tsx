export default function customError() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="/yottabyte-mark.svg"
        width="180"
        className="rounded-3xl"
        alt="YOTTABYTE logo"
      />
      <h1 className="text-xl pb-12 pt-12">
        Hmmm there seems to be an error, this page does not exist.
      </h1>
    </div>
  );
}
