export default function Breadcumb({ name, divider }) {
  return (
    <div className="bg-primary">
      <div className="max-w-5xl m-auto p-4 flex items-center">
        <a href="/" className="text-gray-200 font-light">
          Home
        </a>
        <span className="text-white mx-2">{divider}</span>
        <span className="text-white">Find a Doctor</span>
        <span className="text-white mx-2">{divider}</span>
        <span className="text-white">{name}</span>
      </div>
    </div>
  );
}
