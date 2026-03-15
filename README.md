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
  apiKey: 'your_api_key_here',
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
