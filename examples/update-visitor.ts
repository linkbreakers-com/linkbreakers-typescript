/**
 * Update Visitor Example
 *
 * This example demonstrates how to update an existing visitor using their UUID.
 * Use this when you have the visitor's UUID from your database or a previous API call.
 *
 * Difference from identify:
 * - identify: Uses LBID (from tracking) - finds OR creates visitor
 * - update: Uses UUID (from database) - only updates existing visitor
 *
 * Use Cases:
 * - User updates their profile information
 * - User upgrades/downgrades their subscription
 * - Scheduled job enriches visitor data from external sources
 * - Real-time updates based on user actions in your app
 */

import { Configuration, VisitorsApi } from 'linkbreakers';

const config = new Configuration({
  accessToken: process.env.LINKBREAKERS_API_KEY || 'your-api-key-here',
  basePath: 'https://api.linkbreakers.com',
});

async function updateVisitor() {
  const visitorsApi = new VisitorsApi(config);

  /**
   * Visitor UUID
   *
   * This comes from:
   * 1. Your database (stored when you first identified the visitor)
   * 2. Previous API response (from identify or get visitor)
   * 3. Webhook payload
   *
   * Format: Standard UUID (e.g., "550e8400-e29b-41d4-a716-446655440000")
   */
  const visitorId = '550e8400-e29b-41d4-a716-446655440000';

  try {
    const visitor = await visitorsApi.visitorsServiceUpdate({
      id: visitorId,
      visitorsServiceUpdateBody: {
        visitor: {
          data: {
            // Update system fields
            '$email': 'john.doe.updated@example.com',
            '$phone': '+14155559999',

            // Update custom attributes
            'plan': 'enterprise',
            'planUpgradedAt': new Date().toISOString(),
            'mrr': 499,
            'seats': 10,
            'lastActivity': new Date().toISOString(),

            // Add new custom attributes
            'customDomain': 'acme.example.com',
            'ssoEnabled': true
          }
        }
      }
    });

    console.log('✓ Visitor updated successfully');
    console.log('  - Visitor ID:', visitor.id);
    console.log('  - Email:', visitor.email);
    console.log('  - Updated attributes:', visitor.attributes);

    return visitor;

  } catch (error) {
    console.error('✗ Failed to update visitor:', error);
    throw error;
  }
}

/**
 * Example: Batch update multiple visitors
 * Useful for scheduled jobs or bulk operations
 */
async function batchUpdateVisitors(visitorUpdates: Array<{ id: string; data: Record<string, any> }>) {
  const visitorsApi = new VisitorsApi(config);

  console.log(`Updating ${visitorUpdates.length} visitors...`);

  const results = await Promise.allSettled(
    visitorUpdates.map(async (update) => {
      try {
        const visitor = await visitorsApi.visitorsServiceUpdate({
          id: update.id,
          visitorsServiceUpdateBody: {
            visitor: { data: update.data }
          }
        });
        console.log(`  ✓ Updated visitor ${update.id}`);
        return visitor;
      } catch (error) {
        console.error(`  ✗ Failed to update visitor ${update.id}:`, error);
        throw error;
      }
    })
  );

  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  console.log(`\nBatch update complete: ${succeeded} succeeded, ${failed} failed`);

  return results;
}

// Run the example
if (require.main === module) {
  updateVisitor()
    .then(() => console.log('\n✓ Example completed successfully'))
    .catch((error) => {
      console.error('\n✗ Example failed:', error.message);
      process.exit(1);
    });
}

export { updateVisitor, batchUpdateVisitors };
