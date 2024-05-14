import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImageToBase64 } from "../utility/ImageToBase64";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadImage = async (e) => {
    console.log(e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);
    console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_DOMIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter required fields");
    }
  };

  return (
    <div className="p-4 ">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          name="category"
          value={data.category}
          onChange={handleOnChange}
        >
          <option value={"other"}>Select Category</option>
          <option value={"turtle"}>Turtle</option>
          <option value={"indoor"}>Other Indoore Games</option>
          <option value={"pokemon"}>Pokemon</option>
          <option value={"avocado"}>Avocado</option>
          <option value={"heart"}>Heart</option>
          <option value={"rabbit"}>Rabbit</option>
          <option value={"elephant"}>Elephant</option>
          <option value={"unicorn"}>Unicorn</option>
          <option value={"octopus"}>Octopus</option>
          <option value={"bear"}>Teady Bear</option>
          <option value={"Dinasour"}>Dinasour</option>
          <option value={"mickey"}>Mickey</option>
          <option value={"mini"}>Mini</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <IoCloudUploadOutline />
              </span>
            )}

            <input
              type="file"
              id="image"
              onChange={uploadImage}
              accept="image/*"
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          name="price"
          value={data.price}
          onChange={handleOnChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleOnChange}
          value={data.description}
          name="description"
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg drop-shadow-sm font-medium my-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
