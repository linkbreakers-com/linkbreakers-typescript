/**
 * List Visitors Example
 *
 * This example demonstrates how to query and filter visitors.
 *
 * Use Cases:
 * - Export visitor data for analysis
 * - Find visitors by email or attributes
 * - Build customer segments
 * - Search for specific visitors
 * - Paginate through large visitor lists
 */

import { writeFileSync } from 'fs';
import { Configuration, Visitor, VisitorsApi } from 'linkbreakers';

const config = new Configuration({
  accessToken: process.env.LINKBREAKERS_API_KEY || 'your-api-key-here',
  basePath: 'https://api.linkbreakers.com',
});

/**
 * Example 1: List all visitors with pagination
 */
async function listAllVisitors() {
  const visitorsApi = new VisitorsApi(config);

  try {
    const response = await visitorsApi.visitorsServiceList({
      pageSize: 50,  // Max: 200
      // pageToken: 'next-page-token',  // For pagination
    });

    console.log('✓ Retrieved visitors');
    console.log(`  - Total in this page: ${response.json?.visitors?.length}`);
    console.log(`  - Next page token: ${response.json?.nextPageToken || 'None (last page)'}`);

    response.json?.visitors?.forEach(visitor => {
      console.log(`\n  Visitor: ${visitor.email || 'Anonymous'}`);
      console.log(`    - ID: ${visitor.id}`);
      console.log(`    - Name: ${visitor.firstName} ${visitor.lastName}`);
      console.log(`    - Phone: ${visitor.phone || 'N/A'}`);
    });

    return response;

  } catch (error) {
    console.error('✗ Failed to list visitors:', error);
    throw error;
  }
}

/**
 * Example 2: Find a visitor by email
 */
async function findVisitorByEmail(email: string) {
  const visitorsApi = new VisitorsApi(config);

  try {
    const response = await visitorsApi.visitorsServiceList({
      email: email,  // Exact match filter
      pageSize: 1
    });

    const visitors = response.json?.visitors;
    if (visitors && visitors.length > 0) {
      const visitor = visitors[0];
      console.log('✓ Found visitor');
      console.log('  - ID:', visitor.id);
      console.log('  - Email:', visitor.email);
      console.log('  - Attributes:', visitor.attributes);
      return visitor;
    } else {
      console.log('✗ No visitor found with email:', email);
      return null;
    }

  } catch (error) {
    console.error('✗ Failed to find visitor:', error);
    throw error;
  }
}

/**
 * Example 3: Search visitors across fields
 */
async function searchVisitors(query: string) {
  const visitorsApi = new VisitorsApi(config);

  try {
    const response = await visitorsApi.visitorsServiceList({
      search: query,  // Fuzzy search across name, email, attributes
      pageSize: 50
    });

    console.log(`✓ Search results for "${query}"`);
    console.log(`  - Found ${response.json?.visitors?.length} visitors`);

    response.json?.visitors?.forEach(visitor => {
      console.log(`\n  ${visitor.email || 'Anonymous'}`);
      console.log(`    Name: ${visitor.firstName} ${visitor.lastName}`);
      console.log(`    Company: ${visitor.attributes?.find(attribute => attribute.key === 'company')?.value || 'N/A'}`);
    });

    return response.json?.visitors;

  } catch (error) {
    console.error('✗ Search failed:', error);
    throw error;
  }
}

/**
 * Example 4: Get visitors who clicked a specific link
 */
async function getVisitorsByLink(linkId: string) {
  const visitorsApi = new VisitorsApi(config);

  try {
    const response = await visitorsApi.visitorsServiceList({
      linkId: linkId,  // Filter by link UUID
      pageSize: 100,
      include: ['events']  // Include event data
    });

    console.log(`✓ Visitors who clicked link ${linkId}`);
    console.log(`  - Total visitors: ${response.json?.visitors?.length}`);

    response.json?.visitors?.forEach(visitor => {
      console.log(`\n  ${visitor.email || 'Anonymous'}`);
      console.log(`    Events: ${visitor.events?.length || 0}`);
    });

    return response.json?.visitors;

  } catch (error) {
    console.error('✗ Failed to get visitors by link:', error);
    throw error;
  }
}

/**
 * Example 5: Paginate through all visitors
 */
async function getAllVisitorsPaginated() {
  const visitorsApi = new VisitorsApi(config);
  const allVisitors: Visitor[] = [];
  let pageToken: string | undefined = undefined;
  let pageNum = 1;

  try {
    do {
      console.log(`Fetching page ${pageNum}...`);

      const response = await visitorsApi.visitorsServiceList({
        pageSize: 200,  // Max page size
        pageToken: pageToken
      });

      const visitors = response.json?.visitors;
      if (visitors) {
        allVisitors.push(...visitors);
        console.log(`  ✓ Retrieved ${visitors.length} visitors`);
      }

      pageToken = response.json?.nextPageToken;
      pageNum++;

      // Optional: Add delay to avoid rate limits
      if (pageToken) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

    } while (pageToken);

    console.log(`\n✓ Retrieved all ${allVisitors.length} visitors`);
    return allVisitors;

  } catch (error) {
    console.error('✗ Failed to paginate visitors:', error);
    throw error;
  }
}

/**
 * Example 6: Export visitors to CSV
 */
async function exportVisitorsToCSV() {
  const visitorsApi = new VisitorsApi(config);

  try {
    const response = await visitorsApi.visitorsServiceList({
      pageSize: 200,
      responseFormat: 'RESPONSE_FORMAT_CSV'
    });

    console.log('✓ Exported visitors to CSV');
    const csv = response.csv?.csvData ?? '';
    console.log('  - CSV data length:', csv.length);

    // Save to file
    const filename = `visitors-export-${new Date().toISOString().split('T')[0]}.csv`;
    writeFileSync(filename, csv);
    console.log(`  - Saved to: ${filename}`);

    return csv;

  } catch (error) {
    console.error('✗ Failed to export visitors:', error);
    throw error;
  }
}

// Run examples
if (require.main === module) {
  (async () => {
    console.log('=== List Visitors Examples ===\n');

    console.log('1. List All Visitors:');
    await listAllVisitors();

    console.log('\n2. Find Visitor by Email:');
    await findVisitorByEmail('john.doe@example.com');

    console.log('\n3. Search Visitors:');
    await searchVisitors('Acme');

    console.log('\n✓ All examples completed successfully');
  })().catch((error) => {
    console.error('\n✗ Examples failed:', error.message);
    process.exit(1);
  });
}

export {
  listAllVisitors,
  findVisitorByEmail,
  searchVisitors,
  getVisitorsByLink,
  getAllVisitorsPaginated,
  exportVisitorsToCSV
};
