/**
 * Create Link Example
 *
 * This example demonstrates how to create shortened links with various options.
 *
 * Use Cases:
 * - Create short links for marketing campaigns
 * - Generate trackable links for email campaigns
 * - Create QR codes for print materials
 * - Build dynamic links with custom domains
 * - Tag and organize links for analytics
 */

import { Configuration, LinksApi } from 'linkbreakers';

const config = new Configuration({
  accessToken: process.env.LINKBREAKERS_API_KEY || 'your-api-key-here',
  basePath: 'https://api.linkbreakers.com',
});

/**
 * Example 1: Create a basic shortened link
 */
async function createBasicLink() {
  const linksApi = new LinksApi(config);

  try {
    const response = await linksApi.linksServiceCreate({
      createLinkRequest: {
        destination: 'https://example.com/my-landing-page',
        name: 'Landing Page Campaign'
      }
    });

    console.log('✓ Basic link created');
    console.log('  - Short URL:', response.link?.shortlink);
    console.log('  - Link ID:', response.link?.id);
    console.log('  - Destination:', response.link?.destination);

    return response.link;

  } catch (error) {
    console.error('✗ Failed to create link:', error);
    throw error;
  }
}

/**
 * Example 2: Create a link with custom shortlink and tags
 */
async function createCustomLink() {
  const linksApi = new LinksApi(config);

  try {
    const response = await linksApi.linksServiceCreate({
      createLinkRequest: {
        destination: 'https://example.com/summer-sale',
        name: 'Summer Sale 2024',

        // Custom shortlink (must be unique in your workspace)
        shortlink: 'summer2024',

        // Tags for organization and filtering
        tags: ['campaign', 'summer', '2024', 'email'],

        // Metadata for custom tracking (key-value pairs)
        metadata: {
          'campaign_id': 'SUMMER_2024',
          'utm_source': 'email',
          'utm_medium': 'newsletter',
          'utm_campaign': 'summer_sale'
        }
      }
    });

    console.log('✓ Custom link created');
    console.log('  - Short URL:', response.link?.shortlink);
    console.log('  - Tags:', response.link?.tags);
    console.log('  - Metadata:', response.link?.metadata);

    return response.link;

  } catch (error) {
    console.error('✗ Failed to create custom link:', error);
    throw error;
  }
}

/**
 * Example 3: Create a link with QR code
 */
async function createLinkWithQRCode() {
  const linksApi = new LinksApi(config);

  try {
    const response = await linksApi.linksServiceCreate({
      createLinkRequest: {
        destination: 'https://example.com/event-registration',
        name: 'Event Registration QR Code',

        // Wait for QR code to be generated before returning
        waitForQrcode: true,

        // Optional: Use a specific QR code template
        // qrcodeTemplateId: 'your-template-uuid',

        tags: ['event', 'qr-code']
      }
    });

    console.log('✓ Link with QR code created');
    console.log('  - Short URL:', response.link?.shortlink);
    console.log('  - QR Code URL:', response.link?.qrcodeSignedUrl);
    console.log('  - QR Code Design ID:', response.link?.qrcodeDesignId);

    return response.link;

  } catch (error) {
    console.error('✗ Failed to create link with QR code:', error);
    throw error;
  }
}

/**
 * Example 4: Create a link with custom domain
 */
async function createLinkWithCustomDomain() {
  const linksApi = new LinksApi(config);

  try {
    const response = await linksApi.linksServiceCreate({
      createLinkRequest: {
        destination: 'https://example.com/branded-content',
        name: 'Branded Link',

        // Use your custom domain (must be set up in Linkbreakers)
        customDomainId: 'your-custom-domain-uuid',

        shortlink: 'branded',

        tags: ['branded', 'custom-domain']
      }
    });

    console.log('✓ Branded link created');
    console.log('  - Short URL:', response.link?.shortlink);
    console.log('  - Custom Domain ID:', response.link?.customDomainId);

    return response.link;

  } catch (error) {
    console.error('✗ Failed to create branded link:', error);
    throw error;
  }
}

/**
 * Example 5: Bulk create multiple links
 */
async function bulkCreateLinks() {
  const linksApi = new LinksApi(config);

  const linksToCreate = [
    {
      destination: 'https://example.com/product-1',
      name: 'Product 1',
      tags: ['product', 'catalog'],
      metadata: { sku: 'PROD-001' }
    },
    {
      destination: 'https://example.com/product-2',
      name: 'Product 2',
      tags: ['product', 'catalog'],
      metadata: { sku: 'PROD-002' }
    },
    {
      destination: 'https://example.com/product-3',
      name: 'Product 3',
      tags: ['product', 'catalog'],
      metadata: { sku: 'PROD-003' }
    }
  ];

  try {
    const response = await linksApi.linksServiceCreateBulk({
      createBulkLinksRequest: {
        links: linksToCreate
      }
    });

    console.log(`✓ Bulk created ${response.links?.length} links`);
    response.links?.forEach(link => {
      console.log(`  - ${link.name}: ${link.shortlink}`);
    });

    return response.links;

  } catch (error) {
    console.error('✗ Failed to bulk create links:', error);
    throw error;
  }
}

// Run examples
if (require.main === module) {
  (async () => {
    console.log('=== Create Link Examples ===\n');

    console.log('1. Basic Link:');
    await createBasicLink();

    console.log('\n2. Custom Link with Tags:');
    await createCustomLink();

    console.log('\n3. Link with QR Code:');
    await createLinkWithQRCode();

    console.log('\n4. Bulk Create Links:');
    await bulkCreateLinks();

    console.log('\n✓ All examples completed successfully');
  })().catch((error) => {
    console.error('\n✗ Examples failed:', error.message);
    process.exit(1);
  });
}

export {
  createBasicLink,
  createCustomLink,
  createLinkWithQRCode,
  createLinkWithCustomDomain,
  bulkCreateLinks
};
