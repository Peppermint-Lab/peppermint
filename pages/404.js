export default function customError() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/login.svg" width="500" />
      <h1 className="text-xl pb-12 pt-12">
        Hmmm there seems to be an error, this page does not exist.
      </h1>
      <img src="/404.svg" width="500" />
    </div>
  );
}
