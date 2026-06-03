import { Resend } from 'resend';
import { envSchema } from '@aurabiosphere/config';

// Validate environment variables
const env = envSchema.parse(process.env);

export const resend = new Resend(env.RESEND_API_KEY);

// Email templates
export const emailTemplates = {
  orderConfirmation: (order: any) => ({
    subject: `Order Confirmation #${order.id}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #${order.id} has been received and is being processed.</p>
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map((item: any) => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.quantity}</td>
              <td>$${item.price.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h3>Total: $${order.total.toFixed(2)}</h3>
      <p>We'll notify you once your order has shipped.</p>
      <p>Thank you for shopping with AuraBiosphere!</p>
    `,
  }),

  passwordReset: (user: any, resetToken: string) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Reset Your Password</h1>
      <p>You requested a password reset for your AuraBiosphere account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${env.VERCEL_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}">
        Reset Password
      </a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  }),

  welcomeEmail: (user: any) => ({
    subject: 'Welcome to AuraBiosphere!',
    html: `
      <h1>Welcome to AuraBiosphere!</h1>
      <p>Thank you for joining our community of beauty enthusiasts.</p>
      <p>As a welcome gift, enjoy 15% off your first order with code: WELCOME15</p>
      <p>Start exploring our collection of luxury cosmetics and skincare products.</p>
      <a href="${env.VERCEL_URL || 'http://localhost:5000'}">Shop Now</a>
      <p>If you have any questions, our support team is here to help.</p>
    `,
  }),

  shippingNotification: (order: any, trackingNumber: string) => ({
    subject: `Your Order #${order.id} Has Shipped`,
    html: `
      <h1>Your Order Has Shipped!</h1>
      <p>Great news! Your order #${order.id} has been shipped and is on its way to you.</p>
      <h2>Shipping Details</h2>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
      <p>You can track your package using the tracking number above.</p>
      <p>Thank you for shopping with AuraBiosphere!</p>
    `,
  }),

  reviewRequest: (order: any, product: any) => ({
    subject: 'We\'d love your feedback!',
    html: `
      <h1>How was your experience with ${product.name}?</h1>
      <p>We hope you're enjoying your purchase of ${product.name}.</p>
      <p>Your feedback helps us improve and helps other customers make informed decisions.</p>
      <a href="${env.VERCEL_URL || 'http://localhost:5000'}/products/${product.slug}/review">
        Write a Review
      </a>
      <p>Thank you for being part of the AuraBiosphere community!</p>
    `,
  }),
};

// Send email function
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AuraBiosphere <noreply@aurabiosphere.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(order: any) {
  try {
    const template = emailTemplates.orderConfirmation(order);
    await sendEmail(order.user.email, template.subject, template.html);
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
}

// Send password reset email
export async function sendPasswordResetEmail(user: any, resetToken: string) {
  try {
    const template = emailTemplates.passwordReset(user, resetToken);
    await sendEmail(user.email, template.subject, template.html);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Send welcome email
export async function sendWelcomeEmail(user: any) {
  try {
    const template = emailTemplates.welcomeEmail(user);
    await sendEmail(user.email, template.subject, template.html);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

// Send shipping notification
export async function sendShippingNotification(order: any, trackingNumber: string) {
  try {
    const template = emailTemplates.shippingNotification(order, trackingNumber);
    await sendEmail(order.user.email, template.subject, template.html);
  } catch (error) {
    console.error('Error sending shipping notification:', error);
    throw error;
  }
}

// Send review request
export async function sendReviewRequest(order: any, product: any) {
  try {
    const template = emailTemplates.reviewRequest(order, product);
    await sendEmail(order.user.email, template.subject, template.html);
  } catch (error) {
    console.error('Error sending review request:', error);
    throw error;
  }
}
