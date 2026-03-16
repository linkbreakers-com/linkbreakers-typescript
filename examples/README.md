# Linkbreakers TypeScript SDK Examples

Complete, runnable examples for common use cases with the Linkbreakers API.

## Prerequisites

```bash
# Install the SDK
npm install linkbreakers

# Set your API key
export LINKBREAKERS_API_KEY='your-api-key-here'
```

Or create a `.env` file (see [.env.example](../.env.example)):

```bash
LINKBREAKERS_API_KEY=your-api-key-here
```

## Running Examples

Each example can be run directly with ts-node or compiled first:

```bash
# Using ts-node
npx ts-node examples/identify-visitor.ts

# Or compile and run
npx tsc examples/identify-visitor.ts
node examples/identify-visitor.js
```

## Examples

### 🎯 Visitor Management

#### [identify-visitor.ts](./identify-visitor.ts)
**Most Important Use Case** - Identify or create a visitor using their LBID from tracking.

```typescript
// Find or create visitor, merge attributes
const response = await visitorsApi.visitorsServiceIdentify({
  identifyRequest: {
    lbid: 'visitor-lbid-from-tracking',
    visitor: {
      data: {
        '$email': 'user@example.com',
        '$phone': '+1234567890',
        'company': 'Acme Corp',
        'plan': 'premium'
      }
    }
  }
});
```

**When to use:**
- User signs up or logs in
- User fills out a form
- Capturing visitor information from tracking events
- First-time visitor identification

**Key concepts:**
- Uses LBID (base64 encoded event ID from click/scan)
- Creates visitor if doesn't exist, updates if exists
- System fields use `$` prefix (`$email`, `$phone`, `$firstName`, `$lastName`)
- Custom attributes have no prefix
- `setOnce: true` prevents overwriting existing data

---

#### [update-visitor.ts](./update-visitor.ts)
Update an existing visitor using their UUID.

```typescript
// Update visitor by UUID
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

**When to use:**
- User updates their profile
- Subscription changes
- Enriching data from external sources
- You have the visitor UUID from your database

**Includes:**
- Single visitor update
- Batch update multiple visitors

---

#### [list-visitors.ts](./list-visitors.ts)
Query, filter, and search visitors.

```typescript
// List with filters
const visitors = await visitorsApi.visitorsServiceList({
  pageSize: 50,
  email: 'user@example.com',
  linkId: 'link-uuid',
  search: 'Acme Corp'
});
```

**Features:**
- Pagination through results
- Filter by email (exact match)
- Filter by link ID
- Fuzzy search across fields
- Export to CSV
- Include related data (devices, events, links)

---

### 🔗 Link Management

#### [create-link.ts](./create-link.ts)
Create shortened links with various configurations.

```typescript
// Basic link
const link = await linksApi.linksServiceCreate({
  createLinkRequest: {
    destination: 'https://example.com',
    name: 'My Campaign'
  }
});

// With custom shortlink, tags, and metadata
const customLink = await linksApi.linksServiceCreate({
  createLinkRequest: {
    destination: 'https://example.com/sale',
    shortlink: 'summer2024',
    tags: ['campaign', 'summer'],
    metadata: {
      campaign_id: 'SUMMER_2024'
    }
  }
});
```

**Includes examples for:**
- Basic shortened links
- Custom shortlinks
- Tags and metadata
- QR code generation
- Custom domains
- Bulk link creation

---

## Key Concepts

### LBID vs UUID

- **LBID** (Linkbreakers ID): Base64 encoded event ID from click/scan tracking
  - Comes from tracking cookies, query parameters, or webhooks
  - Used with `identify` endpoint
  - Format: `ZXhhbXBsZS1saW5rYnJlYWtlcnMtaWQtMTIzNDU2Nzg5MA==`

- **UUID**: Standard visitor identifier stored in your database
  - Returned from API responses
  - Used with `update`, `get`, `delete` endpoints
  - Format: `550e8400-e29b-41d4-a716-446655440000`

### System Fields vs Custom Attributes

**System fields** (prefixed with `$`):
- `$email` - Email address
- `$phone` - Phone number
- `$firstName` - First name
- `$lastName` - Last name

**Custom attributes** (no prefix):
- Store any data you need: `company`, `plan`, `signupDate`, etc.
- Used for segmentation, personalization, and analytics

### Pagination

Most list endpoints support pagination:

```typescript
let pageToken: string | undefined;

do {
  const response = await api.list({
    pageSize: 200,
    pageToken: pageToken
  });

  // Process results

  pageToken = response.nextPageToken;
} while (pageToken);
```

## Common Patterns

### Error Handling

```typescript
try {
  const visitor = await visitorsApi.visitorsServiceIdentify({
    identifyRequest: { /* ... */ }
  });
  console.log('Success:', visitor);
} catch (error) {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
  } else {
    console.error('Network Error:', error.message);
  }
}
```

### Environment Configuration

```typescript
import { Configuration } from 'linkbreakers';

const config = new Configuration({
  accessToken: process.env.LINKBREAKERS_API_KEY,
  basePath: process.env.LINKBREAKERS_API_URL || 'https://api.linkbreakers.com',
});
```

### Batch Operations

```typescript
// Process in parallel with Promise.allSettled
const results = await Promise.allSettled(
  items.map(item => api.process(item))
);

const succeeded = results.filter(r => r.status === 'fulfilled');
const failed = results.filter(r => r.status === 'rejected');
```

## Need Help?

- **API Documentation:** https://linkbreakers.com/help/api
- **SDK Issues:** https://github.com/linkbreakers-com/linkbreakers-typescript/issues
- **Main README:** [../README.md](../README.md)

## Contributing Examples

Have a useful example? Submit a PR!

1. Create a new file in `examples/`
2. Include clear comments and use cases
3. Make it runnable with realistic fake data
4. Add it to this README
