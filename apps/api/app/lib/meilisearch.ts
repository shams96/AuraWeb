import { MeiliSearch } from 'meilisearch';
import { envSchema, prisma } from '@chiarel/config';

// Validate environment variables
const env = envSchema.parse(process.env);

export const meilisearchClient = new MeiliSearch({
  host: env.MEILISEARCH_URL,
  apiKey: env.MEILISEARCH_MASTER_KEY,
});

export const indexPrefix = 'chiarel_';

// Create or get product index
export async function getProductIndex() {
  const indexName = `${indexPrefix}products`;
  const index = meilisearchClient.index(indexName);
  
  // Check if index exists, create if not
  try {
    await index.fetchInfo();
  } catch (error) {
    // Index doesn't exist, create it
    await meilisearchClient.createIndex(indexName, {
      primaryKey: 'id',
    });
    
    // Set search settings
    await index.updateSettings({
      searchableAttributes: ['name', 'description', 'shortDescription', 'tags.name'],
      filterableAttributes: ['category.id', 'status', 'tags.slug'],
      sortableAttributes: ['name', 'price', 'createdAt'],
      displayedAttributes: [
        'id',
        'name',
        'slug',
        'description',
        'shortDescription',
        'price',
        'comparePrice',
        'sku',
        'status',
        'featured',
        'images',
        'category.id',
        'category.name',
        'category.slug',
        'tags',
        'variants',
        'createdAt',
        'updatedAt',
      ],
    });
  }
  
  return index;
}

// Index products for search
export async function indexProducts(products: any[]) {
  try {
    const index = await getProductIndex();
    
    // Format products for Meilisearch
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      comparePrice: product.comparePrice,
      sku: product.sku,
      status: product.status,
      featured: product.featured,
      images: product.images,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      },
      tags: product.tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })),
      variants: product.variants.map((variant: any) => ({
        id: variant.id,
        name: variant.name,
        price: variant.price,
        sku: variant.sku,
        options: variant.options.map((option: any) => ({
          name: option.name,
          value: option.value,
        })),
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
    
    await index.addDocuments(formattedProducts);
    console.log(`Indexed ${formattedProducts.length} products`);
  } catch (error) {
    console.error('Error indexing products:', error);
    throw error;
  }
}

// Search products
export async function searchProducts(query: string, filters?: string, limit = 20) {
  try {
    const index = await getProductIndex();
    
    const searchParams = {
      q: query,
      limit,
      filter: filters,
      attributesToHighlight: ['name', 'description', 'shortDescription'],
    };
    
    const searchResults = await index.search(searchParams);
    
    return {
      hits: searchResults.hits,
      totalHits: searchResults.hits.length,
      query: query,
      limit,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

// Update a product in the search index
export async function updateProductInSearchIndex(product: any) {
  try {
    const index = await getProductIndex();
    
    // Format product for Meilisearch
    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      comparePrice: product.comparePrice,
      sku: product.sku,
      status: product.status,
      featured: product.featured,
      images: product.images,
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      },
      tags: product.tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })),
      variants: product.variants.map((variant: any) => ({
        id: variant.id,
        name: variant.name,
        price: variant.price,
        sku: variant.sku,
        options: variant.options.map((option: any) => ({
          name: option.name,
          value: option.value,
        })),
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    
    await index.updateDocuments([formattedProduct]);
    console.log(`Updated product ${product.id} in search index`);
  } catch (error) {
    console.error('Error updating product in search index:', error);
    throw error;
  }
}

// Delete a product from the search index
export async function deleteProductFromSearchIndex(productId: string) {
  try {
    const index = await getProductIndex();
    await index.deleteDocument(productId);
    console.log(`Deleted product ${productId} from search index`);
  } catch (error) {
    console.error('Error deleting product from search index:', error);
    throw error;
  }
}

// Rebuild the entire search index
export async function rebuildSearchIndex() {
  try {
    // Get all products from database
    const products = await prisma.product.findMany({
      include: {
        category: true,
        tags: true,
        variants: {
          include: {
            options: true,
          },
        },
      },
    });
    
    // Clear existing index
    const index = await getProductIndex();
    await index.deleteAllDocuments();
    
    // Index all products
    await indexProducts(products);
    
    console.log('Search index rebuilt successfully');
  } catch (error) {
    console.error('Error rebuilding search index:', error);
    throw error;
  }
}
