# @linkbreakers/sdk

Official TypeScript/JavaScript SDK for the Linkbreakers API.

[![npm version](https://badge.fury.io/js/%40linkbreakers%2Fsdk.svg)](https://www.npmjs.com/package/@linkbreakers/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @linkbreakers/sdk
```

## Usage

```typescript
import { createLinkebreakersClient } from '@linkbreakers/sdk';

// Create API client
const client = createLinkebreakersClient({
  baseUrl: 'https://api.linkbreakers.com',
  headers: {
    'Authorization': 'Bearer your_api_key_here',
  },
});

// Create a shortened link
const { data, error } = await client.POST('/api/v1/links', {
  body: {
    destination: 'https://example.com',
    name: 'My Link',
  },
});

if (error) {
  console.error('Error:', error);
} else {
  console.log('Short link:', data?.shortlink);
}
```

### Type-Safe API Calls

The SDK provides full TypeScript types for all endpoints:

```typescript
// TypeScript will autocomplete endpoints and request/response types
const { data, error } = await client.GET('/api/v1/links/{id}', {
  params: {
    path: { id: 'link-id' },
  },
});

// Update a link
const { data: updated } = await client.PATCH('/api/v1/links/{id}', {
  params: {
    path: { id: 'link-id' },
  },
  body: {
    name: 'Updated Name',
  },
});

// Delete a link
await client.DELETE('/api/v1/links/{id}', {
  params: {
    path: { id: 'link-id' },
  },
});
```

## Features

- ✅ Full TypeScript support with type definitions
- ✅ Works in Node.js and browsers
- ✅ Auto-generated from OpenAPI specification
- ✅ Automatically updated when API changes

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
