import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItems,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, name, image, qty, total, price, category }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold  text-slate-600 capitalize  text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-700"
            onClick={() => dispatch(deleteCartItems(id))}
          >
            <MdDelete />
          </div>
        </div>
        <p className=" text-slate-500 font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button
              className="bg-slate-300 py-2 my-3 rounded hover:bg-slate-400 p-1"
              onClick={() => dispatch(increaseQty(id))}
            >
              <FaPlus />
            </button>
            <p className="font-serif p-1">{qty}</p>
            <button
              className="bg-slate-300  my-3 rounded hover:bg-slate-400 p-1"
              onClick={() => dispatch(decreaseQty(id))}
            >
              <FaMinus />
            </button>
          </div>
          <div className="flex items-center font-bold gap-2 text-slate-700">
            <p>Total: </p>
            <p>
              <span className="text-red-500">₹</span>

              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
