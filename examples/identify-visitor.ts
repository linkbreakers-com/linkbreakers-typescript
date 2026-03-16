/**
 * Identify Visitor Example
 *
 * This example demonstrates how to identify a visitor using their LBID
 * (Linkbreakers ID - a base64 encoded event ID from click/scan tracking).
 *
 * The identify endpoint will:
 * - Find an existing visitor by LBID OR
 * - Create a new visitor profile if one doesn't exist
 * - Merge the provided system fields and custom attributes
 *
 * Use Cases:
 * - User signs up or logs in -> identify them with their email
 * - User fills out a form -> capture their contact info
 * - User makes a purchase -> record their plan/subscription
 * - Enrich visitor data from your CRM or database
 */

import { Configuration, VisitorsApi } from 'linkbreakers';

// Configuration using environment variable
// Set LINKBREAKERS_API_KEY in your .env file
const config = new Configuration({
  accessToken: process.env.LINKBREAKERS_API_KEY || 'your-api-key-here',
  basePath: 'https://api.linkbreakers.com',
});

async function identifyVisitor() {
  const visitorsApi = new VisitorsApi(config);

  /**
   * Example LBID (base64 encoded event ID)
   *
   * In production, the LBID comes from:
   * 1. Tracking cookie set by Linkbreakers JS snippet
   * 2. Query parameter ?lbid=... when visitor clicks a link
   * 3. Webhook payload when visitor interacts with your link
   *
   * Format: base64(workspace_id + event_id + timestamp)
   * This example uses a realistic-looking fake LBID
   */
  const exampleLbid = 'ZXhhbXBsZS1saW5rYnJlYWtlcnMtaWQtMTIzNDU2Nzg5MA==';

  try {
    const response = await visitorsApi.visitorsServiceIdentify({
      identifyRequest: {
        lbid: exampleLbid,

        visitor: {
          data: {
            /**
             * System fields (prefixed with "$")
             * These map to standard visitor properties in Linkbreakers
             */
            '$email': 'john.doe@example.com',
            '$phone': '+14155551234',
            '$firstName': 'John',
            '$lastName': 'Doe',

            /**
             * Custom attributes (no "$" prefix)
             * Store any additional data you need for segmentation,
             * personalization, or analytics
             */
            'company': 'Acme Corporation',
            'jobTitle': 'Product Manager',
            'plan': 'premium',
            'signupDate': '2024-01-15',
            'industry': 'SaaS',
            'employeeCount': 50,
            'source': 'landing-page',
            'referralCode': 'FRIEND2024'
          }
        },

        /**
         * setOnce: Controls merge behavior
         *
         * false (default): Always update fields (overwrites existing values)
         * true: Only set fields that are currently empty (preserves existing data)
         *
         * Use setOnce: true for immutable data like signup source or referral code
         */
        setOnce: false
      }
    });

    // Response indicates if a new profile was created or existing one was updated
    console.log('✓ Visitor identified successfully');
    console.log('  - Created new profile:', response.created);
    console.log('  - Visitor ID:', response.visitor?.id);
    console.log('  - Email:', response.visitor?.email);
    console.log('  - Phone:', response.visitor?.phone);
    console.log('  - Name:', `${response.visitor?.firstName} ${response.visitor?.lastName}`);
    console.log('  - Custom attributes:', response.visitor?.attributes);

    return response.visitor;

  } catch (error) {
    console.error('✗ Failed to identify visitor:', error);
    throw error;
  }
}

// Run the example
if (require.main === module) {
  identifyVisitor()
    .then(() => console.log('\n✓ Example completed successfully'))
    .catch((error) => {
      console.error('\n✗ Example failed:', error.message);
      process.exit(1);
    });
}

export { identifyVisitor };
