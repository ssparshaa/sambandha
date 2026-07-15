const axios = require("axios");

class SmsController {
  async notifyUserAboutOrderStatus({ userPhone, products, status }) {
    // Create a short product summary (limit 2–3 items max for SMS)
    const productSummary = products
      .slice(0, 2)
      .map((p) => `${p.name} x${p.quantity}`)
      .join(", ");

    const moreProducts =
      products.length > 2 ? ` +${products.length - 2} more` : "";

    const formattedMessage = `
Your order status has been updated!
Status: ${status.toUpperCase()}
Items: ${productSummary}${moreProducts}

Thank you for shopping with us 💙
`.trim();

    const payload = {
      token: process.env.SPARROW_SMS_TOKEN,
      from: "TheAlert",
      to: String(userPhone),
      text: formattedMessage,
    };
    try {
      const response = await axios.post(
        "http://api.sparrowsms.com/v2/sms/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.response_code === 200) {
        return { success: true, message: "SMS sent successfully" };
      } else {
        return { error: "SMS API response error", details: response.data };
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      return false;
    }
  }
}

module.exports = new SmsController();
