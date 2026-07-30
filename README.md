# @domainkits/mcp

MCP server for the [DomainKits](https://domainkits.com) domain data API.

This is the official MCP server for the DomainKits API, published and maintained by the DomainKits team. DomainKits is built and operated by [ABTdomain, a domain intelligence platform](https://abtdomain.com), which also owns the GitHub organisation hosting this repository. The relationship is stated on [domainkits.com/about](https://domainkits.com/about).

DomainKits is one API with a shared key across every endpoint. This package exposes all 28 of them to any MCP client: expiring domains, newly registered domains, DNS, WHOIS, reverse nameserver lookups, typosquat detection, TLD trends and more.

Works without an API key on a guest quota, so you can try it before signing up.

## Install

No install step. Point your MCP client at the package and `npx` fetches it on first run.

**Claude Desktop**: add to `claude_desktop_config.json`:

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

**Cursor**: add to `.cursor/mcp.json` in your project, or the global equivalent. Same shape as above.

Any MCP client that speaks stdio works with the same config.

## Credentials

**No key required to start.** Without one you run as a guest: every tool is callable, capped at 5 domain searches, 5 WHOIS lookups and 5 DNS lookups per day. Filters are ignored at that tier and paging stops after 2 pages of 10, so a search returns the newest unfiltered results across every gTLD. It is enough to see what the data looks like.

**Registering is free and changes what you can ask.** A free Member account turns on the filters that make a search a question rather than a sample (restrict to a gTLD, choose where the keyword sits in the name, pick the expiry stage) and raises the daily search quota from 5 to 30, with 10 pages instead of 2.

**Paid tiers widen the same axes.** Lite ($24.99/mo) adds character-set, length, registry-hold and sort filters, 300 searches a day and 50 pages. Premium ($99.99/mo) unlocks every filter the API supports, 2,000 searches a day and 400 pages. Platinum removes the daily and paging caps.

Current pricing: [domainkits.com/pricing](https://domainkits.com/pricing).

To use a key, add it to the `env` block:

```json
{
  "mcpServers": {
    "domainkits": {
      "command": "npx",
      "args": ["-y", "@domainkits/mcp"],
      "env": {
        "DOMAINKITS_API_KEY": "dk_xxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

Keys come from [domainkits.com](https://domainkits.com/pricing) and work across every DomainKits surface: this MCP server, the REST API, and the n8n node. The key is never written to disk by this package.

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

**gTLDs only** for the domain search tools. The index covers generic TLDs: `.com`, `.net`, `.org`, `.info`, `.biz`, `.xyz`, `.online`, `.site`, `.top`, `.club`, `.live`, `.app`, `.dev` and others. Country-code TLDs are not indexed: a query for `.de`, `.io`, `.co` or `.us` returns an empty result set, not an error.

**No PII.** Responses contain no personal data. WHOIS results are limited to registrar, dates, status codes and nameservers; registrant names, emails, addresses and phone numbers are not returned.

Scale, measured on 27 July 2026 by browsing `.com` with no other filter:

| Stage | `.com` domains |
|---|---|
| Expired | 1,597,469 |
| Redemption | 2,754,494 |
| Pending delete | 495,650 |

Counts move daily as names progress through the lifecycle and drop.

## What this package does

It is a stdio transport for the hosted DomainKits MCP endpoint. Tool definitions, filtering and rate limiting all live server-side, so the tool list stays current without republishing this package.

If your client supports remote MCP over HTTP, you can skip this package and connect to the endpoint directly, see the [API reference](https://domainkits.com/dev/api-docs).

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `DOMAINKITS_API_KEY` | (none) | Optional. Without it you run as a guest. |
| `DOMAINKITS_MCP_URL` | `https://api.domainkits.com/v1/mcp` | Override the endpoint. |

## Rate limits

Three things scale with your tier: how often you can ask, how precisely you can ask, and how deep you can read. Figures below are for the domain search tools (`expired`, `nrds`, `deleted`, `aged`, `active`, `market`, `unregistered_ai`, `domain_changes`).

| Tier | Searches/day | Per min | Pages | Filters |
|---|---|---|---|---|
| Guest (no key) | 5 | 2 | 2 | none |
| Member (free) | 30 | 10 | 10 | TLD, keyword position, expiry stage |
| Lite | 300 | 20 | 50 | the above, plus character set, length, registry hold, sort |
| Premium | 2,000 | 60 | 400 | all |
| Platinum | unlimited | unlimited | unlimited | all |

Pages are 10 results each, so Guest sees at most 20 matches per search and Premium 4,000.

Other tool groups have their own quotas: `monitor`, `preferences`, `strategy` and `usage` are unmetered on every tier. Call `usage` for the full picture on your account. Daily quotas reset at 00:00 UTC.

## Resources

- [DomainKits API reference](https://domainkits.com/dev/api-docs)
- [n8n community node](https://www.npmjs.com/package/n8n-nodes-domainkits), same API, same key
- [About DomainKits and ABTdomain](https://domainkits.com/about)
- [ABTdomain](https://abtdomain.com)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## License

[MIT](LICENSE.md)
