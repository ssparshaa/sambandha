const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class MailController {
  async notifyUserAboutOrderStatus({ userEmail, products, status }) {
    try {
      const mailOptions = {
        from: "shreeyanch86@gmail.com",
        to: userEmail,
        subject: "📦 Your Order Status Has Been Updated!",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <h2 style="text-align: center; color: #111827; margin-bottom: 8px;">🛍️ Order Update</h2>
          <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 0;">We wanted to let you know about the latest update on your order.</p>
          
          <!-- Status Badge -->
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; padding: 8px 16px; font-size: 14px; font-weight: bold; color: #fff; border-radius: 20px; background-color: ${
              status === "delivered"
                ? "#16a34a"
                : status === "paid"
                ? "#2563eb"
                : status === "failed"
                ? "#990000ff"
                : "#dc2626"
            };">
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <!-- Product Table -->
          <div style="margin-top: 20px;">
            <h3 style="font-size: 16px; color: #111827; margin-bottom: 10px;">Your Order Summary:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 8px; background: #f3f4f6; color: #374151; font-size: 14px;">Product</th>
                  <th style="text-align: center; padding: 8px; background: #f3f4f6; color: #374151; font-size: 14px;">Qty</th>
                  <th style="text-align: right; padding: 8px; background: #f3f4f6; color: #374151; font-size: 14px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${products
                  .map(
                    (p) => `
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">${p.name}</td>
                    <td style="text-align: center; padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">${p.quantity}</td>
                    <td style="text-align: right; padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">Rs. ${p.price}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; text-align: center;">
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 10px;">Thank you for shopping with us 💖</p>
            <a href="#" style="display: inline-block; padding: 10px 18px; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 8px;">Track My Order</a>
          </div>
        </div>
      `,
      };

      await new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return reject(error);
          } else {
            resolve(info);
          }
        });
      });

      return true;
    } catch (error) {
      console.error("Error in notifyUserAboutOrderStatus:", error);
      return false;
    }
  }
}

module.exports = new MailController();
