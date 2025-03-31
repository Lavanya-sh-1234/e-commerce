import { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user"))?.user?.uid;
  const context = useContext(myContext);
  const { mode, order } = context;

  return (
    <Layout>
      {order.length > 0 ? (
        <div className="h-full pt-10 px-4">
          {order
            .filter((obj) => obj.userid === userid)
            .map((order, index) => {
              const groupedItems = {};
              order.cartItems.forEach((item) => {
                if (groupedItems[item.title]) {
                  groupedItems[item.title].count += 1;
                } else {
                  groupedItems[item.title] = { ...item, count: 1 };
                }
              });

              return (
                <div
                  key={index}
                  className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {Object.keys(groupedItems).map((key, ind) => {
                    const item = groupedItems[key];
                    return (
                      <div key={ind} className="rounded-lg">
                        <div
                          className="mb-6 rounded-lg p-6 shadow-md flex items-center gap-4 transition duration-300 transform hover:scale-105"
                          style={{
                            backgroundColor:
                              mode === "dark" ? "#282c34" : "#ffffff",
                            color: mode === "dark" ? "white" : "#333",
                            border:
                              mode === "dark"
                                ? "1px solid #444"
                                : "1px solid #ddd",
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt="product-image"
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex flex-col flex-grow">
                            <h2
                              className="text-lg font-bold"
                              style={{
                                color: mode === "dark" ? "white" : "#333",
                              }}
                            >
                              {item.title}
                            </h2>

                            <p
                              className="font-semibold mt-2"
                              style={{
                                color: mode === "dark" ? "#ffffff" : "#333",
                              }}
                            >
                              ₹{item.price}
                            </p>
                            <p
                              className="text-sm font-medium"
                              style={{
                                color: mode === "dark" ? "#ccc" : "#444",
                              }}
                            >
                              Quantity: {item.count}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      ) : (
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white">
          No Orders Found
        </h2>
      )}
    </Layout>
  );
}

export default Order;
