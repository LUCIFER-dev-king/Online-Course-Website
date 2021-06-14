const Razorpay = require("razorpay");

export const OrderHelper = async () => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_vnbvemEiwBGIeE",
      key_secret: "HJDxQGcgPXPip7wuYrll1RFr",
    });
    const options = {
      amount: 5000,
      currency: "INR",
      receipt: "receipt_order",
    };
    const order = await instance.orders.create(options);
    if (!order) {
      return "Error occured";
    }
    return order;
  } catch (error) {
    console.log("Error:", error);
  }
};
