# @domainkits/mcp

MCP server for the [DomainKits](https://domainkits.com) domain data API.

DomainKits is one API with a shared key across every endpoint. This package exposes all 28 of them to any MCP client — expiring domains, newly registered domains, DNS, WHOIS, reverse nameserver lookups, typosquat detection, TLD trends and more.

Works without an API key on a guest quota, so you can try it before signing up.

## Install

No install step. Point your MCP client at the package and `npx` fetches it on first run.

**Claude Desktop** — add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "domainkits": {
      "command": "npx",
      "args": ["-y", "@domainkits/mcp"]
    }
  }
}
```

**Cursor** — add to `.cursor/mcp.json` in your project, or the global equivalent. Same shape as above.

Any MCP client that speaks stdio works with the same config.

## Credentials

**No key required to start.** Without one you run as a guest: every tool is callable on a small daily quota — 5 domain searches, 5 WHOIS lookups, 5 DNS lookups per day.

Guest access is for trying the server, not working with it. Filters are ignored at that tier, so a search returns unfiltered results across every gTLD, and paging stops after 2 pages of 10. Filters and deeper paging unlock with a key.

To raise the quota, add your key to the `env` block:

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

Keys come from [domainkits.com](https://domainkits.com/pricing) and work across every DomainKits surface — this MCP server, the REST API, and the n8n node. The key is never written to disk by this package.

Call the `usage` tool at any time for your current tier and remaining quota on every endpoint.

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

Quotas are per tool group and rise with your plan. Guest access needs no key; the paid tiers start at [domainkits.com/pricing](https://domainkits.com/pricing).

Daily quota for the domain search tools (`expired`, `nrds`, `deleted`, `aged`, `active`, `market`, `unregistered_ai`, `domain_changes`):

| Tier | Searches per day | Per minute |
|---|---|---|
| Guest (no key) | 5 | 2 |
| Member | 30 | 10 |
| Lite | 300 | 20 |
| Premium | 2,000 | 60 |
| Platinum | unlimited | unlimited |

Quota is not the only thing that scales. Filters and paging depth do too:

| Tier | Search filters | Max pages |
|---|---|---|
| Guest | none | 2 |
| Member | TLD, keyword position, expiry stage | 10 |
| Lite | the above, plus character set, length, hold status, sort | 50 |
| Premium | all filters | 400 |
| Platinum | all filters | unlimited |

Other tool groups have their own limits — `monitor`, `preferences`, `strategy` and `usage` are unmetered on every tier. Call `usage` for the full picture on your account. Daily quotas reset at 00:00 UTC.

## Resources

- [DomainKits API reference](https://domainkits.com/dev/api-docs)
- [n8n community node](https://www.npmjs.com/package/n8n-nodes-domainkits) — same API, same key
- [Model Context Protocol](https://modelcontextprotocol.io/)

## License

[MIT](LICENSE.md)
