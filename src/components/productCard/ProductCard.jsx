import { useContext } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCart = (product) => {
    const productData = {
      ...product,
      time: product.time?.seconds ? product.time.seconds * 1000 : Date.now(),
    };

    dispatch(addToCart(productData));
    
    toast.success("added to cart");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter((obj) => obj.title.toLowerCase().includes(searchkey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .filter((obj) => obj.price.toLowerCase().includes(filterPrice))
            .slice(0, 4)
            .map((item, index) => {
              const { title, price, imageUrl, id } = item;

              return (
                <div
                  onClick={() => (navigate(`/productinfo/${id}`))}
                  className="p-4 md:w-1/4  drop-shadow-lg "
                  key={index}
                >
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow 
               duration-300 ease-in-out border-gray-200 border-opacity-60 
               rounded-2xl overflow-hidden flex flex-col"
                    >
                      {/* Image */}

                      <div className="flex justify-center cursor-pointer">
                        <div className="w-full h-80 p-2 overflow-hidden flex items-center justify-center bg-white">
                          <img
                            className="rounded-2xl w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
                            src={imageUrl}
                            alt="blog"
                          />
                        </div>
                      </div>

                      {/* Product Details Wrapper */}
                      <div className="p-5 border-t-2 flex flex-col h-full">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          E-Bharat
                        </h2>
                        <h1
                          title={title}
                          className="title-font text-lg font-medium text-gray-900 mb-3 truncate w-50   md:w-full cursor-pointer"
                        >
                          {title}
                        </h1>
                        <p className="leading-relaxed mb-3">{price}</p>

                        <div className="flex justify-center mt-auto">
                          <button
                            onClick={() => addCart(item)}
                            type="button"
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 
        focus:ring-4 focus:ring-purple-300 font-medium rounded-lg 
        text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
