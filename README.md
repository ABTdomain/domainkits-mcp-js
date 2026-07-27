# @domainkits/mcp

MCP server for the [DomainKits](https://domainkits.com) domain data API.

DomainKits is one API with a shared key across every endpoint. This package exposes all 28 of them to any MCP client — expiring domains, newly registered domains, DNS, WHOIS, reverse nameserver lookups, typosquat detection, TLD trends and more — through a single credential.

## Install

No install step. Point your MCP client at the package and `npx` fetches it on first run.

**Claude Desktop** — add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "domainkits": {
      "command": "npx",
      "args": ["-y", "@domainkits/mcp"],
      "env": {
        "DOMAINKITS_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Cursor** — add to `.cursor/mcp.json` in your project, or the global equivalent. Same shape as above.

Any MCP client that speaks stdio works with the same config.

## Credentials

You need a DomainKits API key. Sign up at [domainkits.com](https://domainkits.com/pricing) — API access requires a Premium or higher plan, and Premium includes a trial period. The same key works for the DomainKits n8n node and the hosted MCP endpoint.

Set it as `DOMAINKITS_API_KEY` in the `env` block of your client config. The key is never written to disk by this package.

## Tools

28 tools, grouped by what they answer:

| Group | Tools |
|---|---|
| Domain lifecycle | `expired`, `deleted`, `nrds`, `aged`, `active` |
| Availability | `available`, `bulk_available`, `bulk_tld`, `tld_check` |
| Records | `dns`, `whois`, `ns_reverse`, `domain_changes` |
| Market | `market`, `market_price`, `price` |
| Research | `keyword_data`, `keywords_trends`, `tld_rank`, `tld_trends`, `backlink_summary`, `unregistered_ai` |
| Risk | `safety`, `typosquat` |
| Account | `usage`, `monitor`, `preferences`, `strategy` |

Each tool ships its own input and output schema, so the client knows what arguments are valid before calling. Run `usage` to see your account's quota for every endpoint.

## Coverage

**gTLDs only** for the domain search tools. The index covers generic TLDs — `.com`, `.net`, `.org`, `.info`, `.biz`, `.xyz`, `.online`, `.site`, `.top`, `.club`, `.live`, `.app`, `.dev` and others. Country-code TLDs are not indexed: a query for `.de`, `.io`, `.co` or `.us` returns an empty result set, not an error.

Scale, measured on 27 July 2026 by browsing `.com` with no other filter:

| Stage | `.com` domains |
|---|---|
| Expired | 1,597,469 |
| Redemption | 2,754,494 |
| Pending delete | 495,650 |

Counts move daily as names progress through the lifecycle and drop.

## What this package does

It is a stdio transport for the hosted DomainKits MCP endpoint. Tool definitions, filtering and rate limiting all live server-side, so the tool list stays current without republishing this package.

If your client supports remote MCP over HTTP, you can skip this package and connect to the endpoint directly — see the [API reference](https://domainkits.com/dev/api-docs).

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `DOMAINKITS_API_KEY` | — | Required. Your API key. |
| `DOMAINKITS_MCP_URL` | `https://api.domainkits.com/v1/mcp` | Override the endpoint. |

## Rate limits

Quotas follow your account and vary by plan. Call the `usage` tool for your current limits and remaining allowance on every endpoint. Daily quotas reset at 00:00 UTC, monthly quotas on the 1st.

## Resources

- [DomainKits API reference](https://domainkits.com/dev/api-docs)
- [n8n community node](https://www.npmjs.com/package/n8n-nodes-domainkits) — same API, same key
- [Model Context Protocol](https://modelcontextprotocol.io/)

## License

[MIT](LICENSE.md)
