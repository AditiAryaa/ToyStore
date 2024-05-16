import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px]">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="w-40 min-h-[150]">
              <img src={image} className="w-full h-full " />
            </div>
            <h3 className="font-semibold text-center text-slate-600 capitalize text-lg">
              {name}
            </h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>
            <p className="text-center font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <img src={loading} className="h-5" />
        </div>
      )}
    </div>
  );
};

export default HomeCard;
