# linkbreakers

Official TypeScript/JavaScript SDK for the Linkbreakers API.

[![npm version](https://badge.fury.io/js/linkbreakers.svg)](https://www.npmjs.com/package/linkbreakers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install linkbreakers
```

## Usage

```typescript
import { Configuration, LinksApi } from 'linkbreakers';

// Configure API client
const config = new Configuration({
  accessToken: 'your_api_key_here',  // Use accessToken, not apiKey
  basePath: 'https://api.linkbreakers.com',
});

const linksApi = new LinksApi(config);

// Create a shortened link
const link = await linksApi.createLink({
  destination: 'https://example.com',
  name: 'My Link',
});

console.log('Short link:', link.shortlink);
```

### Authentication

**Important:** The Linkbreakers API uses Bearer token authentication. When configuring the SDK, you must use the `accessToken` parameter (NOT `apiKey`):

```typescript
// ✅ CORRECT - Sends "Authorization: Bearer {token}" header
const config = new Configuration({
  accessToken: 'your-workspace-token',
  basePath: 'https://api.linkbreakers.com',
});

// ❌ WRONG - Does not send authentication headers
const config = new Configuration({
  apiKey: 'your-workspace-token',  // This won't work!
  basePath: 'https://api.linkbreakers.com',
});
```

Get your workspace API token from the [Linkbreakers dashboard](https://app.linkbreakers.com).

### Identifying Visitors

Use the `VisitorsApi` to identify and update visitor profiles. The `identify` method finds or creates a visitor using their LBID (from tracking) and merges attributes:

```typescript
import { Configuration, VisitorsApi } from 'linkbreakers';

const config = new Configuration({
  accessToken: 'your_api_key_here',
  basePath: 'https://api.linkbreakers.com',
});

const visitorsApi = new VisitorsApi(config);

// Identify a visitor using their LBID (from tracking cookie/parameter)
const response = await visitorsApi.visitorsServiceIdentify({
  identifyRequest: {
    lbid: 'visitor-lbid-from-tracking',  // Base64 encoded event ID from click/scan
    visitor: {
      data: {
        // System fields (prefixed with "$")
        '$email': 'user@example.com',
        '$phone': '+1234567890',
        '$firstName': 'John',
        '$lastName': 'Doe',

        // Custom attributes (no "$" prefix)
        'company': 'Acme Corp',
        'plan': 'premium',
        'signupDate': '2024-01-01'
      }
    },
    setOnce: false  // If true, only sets empty fields (won't overwrite existing)
  }
});

console.log('Created new profile:', response.created);
console.log('Visitor:', response.visitor);
```

**Update an existing visitor by UUID:**

```typescript
// When you have the visitor's UUID (from your database)
const visitor = await visitorsApi.visitorsServiceUpdate({
  id: 'visitor-uuid',
  visitorsServiceUpdateBody: {
    visitor: {
      data: {
        '$email': 'updated@example.com',
        'plan': 'enterprise'
      }
    }
  }
});
```

**Get visitor details:**

```typescript
const visitor = await visitorsApi.visitorsServiceGet({
  id: 'visitor-uuid',
  include: ['devices', 'events', 'links']  // Optional: include related data
});
```

**List visitors:**

```typescript
const visitors = await visitorsApi.visitorsServiceList({
  pageSize: 50,
  email: 'user@example.com',  // Optional filters
  linkId: 'link-uuid',
  search: 'Acme Corp'
});
```

### Full API Support

The SDK provides type-safe methods for all API operations:

```typescript
// Get a link by ID
const link = await linksApi.getLink({ id: 'link-id' });

// Update a link
const updated = await linksApi.updateLink({
  id: 'link-id',
  updateLinkRequest: {
    name: 'Updated Name',
  },
});

// Delete a link
await linksApi.deleteLink({ id: 'link-id' });

// List links with filtering
const links = await linksApi.listLinks({
  pageSize: 50,
  search: 'my-search',
  tags: ['tag1', 'tag2'],
});
```

## Features

- ✅ Full TypeScript support with type definitions
- ✅ Works in Node.js and browsers
- ✅ Auto-generated from OpenAPI specification
- ✅ Automatically updated when API changes

## Examples

For complete, runnable code examples, see the [examples/](./examples) directory:

- **[identify-visitor.ts](./examples/identify-visitor.ts)** - Identify visitors using LBID (most important!)
- **[update-visitor.ts](./examples/update-visitor.ts)** - Update visitors by UUID
- **[create-link.ts](./examples/create-link.ts)** - Create shortened links with various options
- **[list-visitors.ts](./examples/list-visitors.ts)** - Query and filter visitors

Each example is complete, well-documented, and ready to run. See [examples/README.md](./examples/README.md) for details.

## Documentation

For complete API documentation, visit [https://docs.linkbreakers.com](https://docs.linkbreakers.com)

## Auto-Generated SDK

This SDK is automatically generated from the Linkbreakers OpenAPI specification. When the API is updated, this SDK is automatically regenerated and published.

**Current API Version:** See [OPENAPI_VERSION](./OPENAPI_VERSION)

## Support

- **Issues:** [GitHub Issues](https://github.com/linkbreakers-com/linkbreakers-typescript/issues)
- **Documentation:** [https://docs.linkbreakers.com](https://docs.linkbreakers.com)

## License

MIT License - see [LICENSE](./LICENSE) for details.
