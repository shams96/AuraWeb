import { createMockRequest, createMockResponse, mockPrisma } from './setup';
import { GET, POST } from '../app/api/products/route';

describe('Products API', () => {
  beforeEach(() => {
    mockPrisma.reset();
  });

  describe('GET /api/products', () => {
    it('should return products with pagination', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          slug: 'product-1',
          price: 29.99,
          status: 'ACTIVE',
          category: { id: '1', name: 'Category 1', slug: 'category-1' },
          variants: [],
          tags: [],
          images: [],
        },
        {
          id: '2',
          name: 'Product 2',
          slug: 'product-2',
          price: 39.99,
          status: 'ACTIVE',
          category: { id: '1', name: 'Category 1', slug: 'category-1' },
          variants: [],
          tags: [],
          images: [],
        },
      ];

      (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (mockPrisma.product.count as jest.Mock).mockResolvedValue(2);

      const request = createMockRequest('/api/products?page=1&limit=10');
      const response = await GET(request);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.products).toHaveLength(2);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      });
    });

    it('should filter products by category', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          slug: 'product-1',
          price: 29.99,
          status: 'ACTIVE',
          category: { id: '1', name: 'Category 1', slug: 'category-1' },
          variants: [],
          tags: [],
          images: [],
        },
      ];

      (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (mockPrisma.product.count as jest.Mock).mockResolvedValue(1);
      (mockPrisma.category.findFirst as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Category 1',
        slug: 'category-1',
      });

      const request = createMockRequest('/api/products?category=category-1');
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockPrisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            categoryId: '1',
            status: 'ACTIVE',
          }),
        })
      );
    });

    it('should search products', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Test Product',
          slug: 'test-product',
          price: 29.99,
          status: 'ACTIVE',
          category: { id: '1', name: 'Category 1', slug: 'category-1' },
          variants: [],
          tags: [],
          images: [],
        },
      ];

      (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (mockPrisma.product.count as jest.Mock).mockResolvedValue(1);

      const request = createMockRequest('/api/products?search=test');
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockPrisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              expect.objectContaining({
                name: expect.objectContaining({
                  contains: 'test',
                  mode: 'insensitive',
                }),
              }),
            ]),
          }),
        })
      );
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const mockProduct = {
        id: '1',
        name: 'New Product',
        slug: 'new-product',
        price: 29.99,
        status: 'ACTIVE',
        category: { id: '1', name: 'Category 1', slug: 'category-1' },
        variants: [],
        tags: [],
        images: [],
      };

      (mockPrisma.product.create as jest.Mock).mockResolvedValue(mockProduct);
      (mockPrisma.category.findFirst as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Category 1',
        slug: 'category-1',
      });

      const request = createMockRequest('/api/products', 'POST', {
        'Content-Type': 'application/json',
      });
      request.json = jest.fn().mockResolvedValue({
        name: 'New Product',
        slug: 'new-product',
        price: 29.99,
        categoryId: '1',
      });

      const response = await POST(request);

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toEqual(mockProduct);
      expect(mockPrisma.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'New Product',
            slug: 'new-product',
            price: 29.99,
            categoryId: '1',
          }),
        })
      );
    });

    it('should return 400 for invalid product data', async () => {
      const request = createMockRequest('/api/products', 'POST', {
        'Content-Type': 'application/json',
      });
      request.json = jest.fn().mockResolvedValue({
        name: '', // Invalid: empty name
      });

      const response = await POST(request);

      expect(response.status).toBe(500); // Zod validation error
    });
  });
});
