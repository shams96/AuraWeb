import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@isolavitale.com' },
    update: {},
    create: {
      email: 'admin@isolavitale.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Create sample categories
  const skincare = await prisma.category.create({
    data: {
      name: 'Skincare',
      slug: 'skincare',
      description: 'Premium skincare products for all skin types',
      image: '/images/categories/skincare.jpg',
    },
  });

  const makeup = await prisma.category.create({
    data: {
      name: 'Makeup',
      slug: 'makeup',
      description: 'Luxury makeup products for a flawless look',
      image: '/images/categories/makeup.jpg',
    },
  });

  const fragrance = await prisma.category.create({
    data: {
      name: 'Fragrance',
      slug: 'fragrance',
      description: 'Exquisite fragrances for every occasion',
      image: '/images/categories/fragrance.jpg',
    },
  });

  // Create sample products
  const moisturizer = await prisma.product.create({
    data: {
      name: 'Luxury Moisturizing Cream',
      slug: 'luxury-moisturizing-cream',
      description: 'A deeply hydrating cream that nourishes and revitalizes the skin.',
      shortDescription: 'Intense hydration for radiant skin',
      price: 85.00,
      comparePrice: 120.00,
      sku: 'LMC001',
      barcode: '123456789012',
      trackQuantity: true,
      quantity: 100,
      status: 'ACTIVE',
      featured: true,
      images: [
        '/images/products/moisturizer-1.jpg',
        '/images/products/moisturizer-2.jpg',
        '/images/products/moisturizer-3.jpg',
      ],
      category: {
        connect: { id: skincare.id },
      },
      tags: {
        create: [
          { name: 'moisturizing', slug: 'moisturizing' },
          { name: 'anti-aging', slug: 'anti-aging' },
          { name: 'hydrating', slug: 'hydrating' },
        ],
      },
    },
  });

  const lipstick = await prisma.product.create({
    data: {
      name: 'Velvet Matte Lipstick',
      slug: 'velvet-matte-lipstick',
      description: 'A rich, velvety matte lipstick that provides intense color and all-day comfort.',
      shortDescription: 'Intense color with a velvety matte finish',
      price: 32.00,
      comparePrice: 45.00,
      sku: 'VML002',
      barcode: '123456789013',
      trackQuantity: true,
      quantity: 150,
      status: 'ACTIVE',
      featured: true,
      images: [
        '/images/products/lipstick-1.jpg',
        '/images/products/lipstick-2.jpg',
      ],
      category: {
        connect: { id: makeup.id },
      },
      variants: {
        create: [
          {
            name: 'Red',
            sku: 'VML002-RED',
            price: 32.00,
            comparePrice: 45.00,
            quantity: 50,
            image: '/images/products/lipstick-red.jpg',
            options: {
              create: [
                { name: 'Color', value: 'Red' },
              ],
            },
          },
          {
            name: 'Nude',
            sku: 'VML002-NUDE',
            price: 32.00,
            comparePrice: 45.00,
            quantity: 50,
            image: '/images/products/lipstick-nude.jpg',
            options: {
              create: [
                { name: 'Color', value: 'Nude' },
              ],
            },
          },
          {
            name: 'Rose',
            sku: 'VML002-ROSE',
            price: 32.00,
            comparePrice: 45.00,
            quantity: 50,
            image: '/images/products/lipstick-rose.jpg',
            options: {
              create: [
                { name: 'Color', value: 'Rose' },
              ],
            },
          },
        ],
      },
      tags: {
        create: [
          { name: 'lipstick', slug: 'lipstick' },
          { name: 'matte', slug: 'matte' },
          { name: 'long-lasting', slug: 'long-lasting' },
        ],
      },
    },
  });

  const perfume = await prisma.product.create({
    data: {
      name: 'Eau de Parfum - Midnight Blossom',
      slug: 'eau-de-parfum-midnight-blossom',
      description: 'An enchanting fragrance that captures the essence of midnight blossoms.',
      shortDescription: 'Enchanting floral fragrance',
      price: 120.00,
      comparePrice: 150.00,
      sku: 'EDP003',
      barcode: '123456789014',
      trackQuantity: true,
      quantity: 75,
      status: 'ACTIVE',
      featured: true,
      images: [
        '/images/products/perfume-1.jpg',
        '/images/products/perfume-2.jpg',
      ],
      category: {
        connect: { id: fragrance.id },
      },
      tags: {
        create: [
          { name: 'perfume', slug: 'perfume' },
          { name: 'floral', slug: 'floral' },
          { name: 'long-lasting', slug: 'long-lasting' },
        ],
      },
    },
  });

  // Create sample pages
  await prisma.page.create({
    data: {
      title: 'About Us',
      slug: 'about-us',
      content: `
        <h2>Our Story</h2>
        <p>Isola Vitale was born from a passion for luxury cosmetics that enhance natural beauty while respecting the environment.</p>
        <p>Our mission is to provide our customers with the highest quality products that are both effective and sustainable.</p>
      `,
      published: true,
      metaTitle: 'About Isola Vitale - Luxury Cosmetics',
      metaDescription: 'Learn about our story, mission, and commitment to quality and sustainability in luxury cosmetics.',
    },
  });

  await prisma.page.create({
    data: {
      title: 'Contact Us',
      slug: 'contact-us',
      content: `
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you! Please fill out the form below or contact us directly.</p>
        <p>Email: hello@isolavitale.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Beauty Lane, Luxury City, LC 12345</p>
      `,
      published: true,
      metaTitle: 'Contact Isola Vitale - Luxury Cosmetics',
      metaDescription: 'Contact Isola Vitale for inquiries about our luxury cosmetics products and services.',
    },
  });

  // Create sample FAQs
  await prisma.faq.create({
    data: {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for an additional fee.',
      published: true,
    },
  });

  await prisma.faq.create({
    data: {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.',
      published: true,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
