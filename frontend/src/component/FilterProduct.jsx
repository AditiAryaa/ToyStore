import bunnyImage from "../assets/peeping bunny.avif";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl  rounded-full p-1 bg-violet-500  cursor-pointer ${
          isActive && "bg-red-600"
        }`}
      >
        <img src={bunnyImage} className="h-16 w-16  rounded-full" />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
