import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CardFeature from "../component/CardFeature";
import loadingImage from "../assets/loading.gif";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useRef } from "react";
import Allproduct from "../component/Allproduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const homeProductCartList = productData.slice(0, 4);
  const homeProductCartListIndoor = productData.filter(
    (el) => el.category === "indoore",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const categoryList = [...new Set(productData.map((el) => el.category))];

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 rounded-full items-center">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest delivery in{" "}
            <span className="text-purple-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Soft toys, also known as stuffed or plush toys, are cuddly and
            huggable items that are usually made of soft fabrics and filled with
            plush material. Stuffed toys come in various different shapes,
            sizes, and colours. They can be designed in the form of humans,
            animals, and fictional characters
          </p>
          <button className="font-bold bg-purple-500 px-4 py-2 text-slate-200 rounded-md hover:bg-purple-700">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading={loadingImage} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Other Indoor Games
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrFormNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListIndoor[0]
            ? homeProductCartListIndoor.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => {
                <CardFeature loading={loadingImage} key={index} />;
              })}
        </div>
      </div>
      <Allproduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
