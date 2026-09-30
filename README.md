# @domainkits/mcp

MCP server for the [DomainKits](https://domainkits.com) domain data API.

This is the official MCP server for the DomainKits API, published and maintained by the DomainKits team. DomainKits is built and operated by Lyalpha GmbH, with domain data and infrastructure provided by [ABTdomain](https://abtdomain.com), our domain intelligence and data aggregation platform. This repository is hosted under the ABTdomain GitHub organisation. Learn more about the relationship at [domainkits.com/about](https://domainkits.com/about).

DomainKits is one API with a shared key across every surface. This package exposes the full DomainKits tool set to any MCP client: expiring domains, newly registered domains, DNS, WHOIS, reverse nameserver lookups, typosquat detection, TLD trends and more.

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

**No key required to start.** Without one you run on a guest quota, enough to see what the data looks like. A free account raises the limits and unlocks filters; paid tiers raise them further. Current tiers and limits: [domainkits.com/pricing](https://domainkits.com/pricing). The `usage` tool reports the live quota for your own account at any time.

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

## Tools

| Tool | What it does |
|---|---|
| `nrds` | Search newly registered domains from the last 60 days, or browse one gTLD |
| `nrds_live` | Search the live feed of newly registered domains; reaches back up to 60 days, best for the last three days |
| `expired` | Search domains in the deletion cycle: expired, in redemption, or pending delete |
| `deleted` | Search dropped domains, as of the latest data update (confirm availability before registering) |
| `aged` | Search registered domains with 5 to 20+ years of history |
| `active` | Search currently registered gTLD domains |
| `market` | Search registered domains carrying marketplace listing data |
| `available` | Confirm one domain's registrability and price |
| `bulk_available` | Registration status for up to 50 domains in one call |
| `bulk_tld` | How many TLDs each of up to 50 keywords is registered in (counts only) |
| `tld_check` | Check how a prefix is registered across the core TLDs |
| `whois` | WHOIS/RDAP registration data: registrar, dates, status, nameservers |
| `dns` | Resolve a domain's DNS records |
| `ns_reverse` | List the gTLD domains hosted on one nameserver |
| `domain_changes` | Registration and status changes to premium .com names over the last 7 days |
| `ip_lookup` | Resolve an IP or hostname to its network operator and approximate location |
| `registrar` | Look up ICANN-accredited registrars by name, alias or IANA ID |
| `epp_status` | Explain a domain EPP status code and what the holder can do about it |
| `market_price` | Aftermarket listing status and price for a domain |
| `price` | Standard registration and renewal price for a TLD |
| `keyword_data` | Search volume, CPC and competition for a keyword |
| `keywords_trends` | Keyword registration boards: hot, emerging and prefix activity |
| `tld_rank` | Rank TLDs by registration volume over a chosen period |
| `tld_trends` | Registration trend data for one TLD, or a comparison of several |
| `backlink_summary` | A domain's backlink profile and spam score |
| `unregistered_ai` | Unregistered short .ai domains by letter pattern |
| `typosquat` | Generate typosquat variants of a domain and check which are registered |
| `usage` | Your account's current tier, usage and rate limits |
| `monitor` | Manage domain monitoring tasks across WHOIS, DNS and page content |
| `preferences` | Manage saved preferences and the memory switch |
| `strategy` | Store your own strategy text and its run results |

Each tool ships its own input and output schema, so the client knows what arguments are valid before calling. The tool list is served live by the endpoint, so your client always sees the current set.

### Stateful tools and what they store

Search and lookup tools are stateless: nothing you ask is retained. Three tools do store data across sessions, by design:

| Tool | What it stores |
|---|---|
| `monitor` | The domains you watch and the results of each check |
| `preferences` | Your saved preferences and the memory switch |
| `strategy` | Strategy text you wrote, run timestamps and the most recent result |

Storage is opt-in. Memory is off by default and must be enabled through `preferences` before `monitor` or `strategy` will accept anything. Stored data is encrypted at rest in isolated per-user directories, persists across MCP clients under the same account, and can be deleted in full at any time with `preferences` `action: delete`.

Full details: [Privacy Policy](https://domainkits.com/privacy) | [Terms of Service](https://domainkits.com/terms)

No tool returns domain registrant personal data. `registrar` returns ICANN-published registrar business contacts.

## What this package does

It is a stdio transport for the hosted DomainKits MCP endpoint. Tool definitions, filtering and rate limiting all live server-side, so the tool list stays current without republishing this package.

If your client supports remote MCP over HTTP, you can skip this package and connect to the endpoint directly, see the [API reference](https://domainkits.com/dev/api-docs).

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `DOMAINKITS_API_KEY` | (none) | Optional. Without it you run as a guest. |
| `DOMAINKITS_MCP_URL` | `https://api.domainkits.com/v1/mcp` | Override the endpoint. |

## Resources

- [DomainKits API reference](https://domainkits.com/dev/api-docs)
- [n8n community node](https://www.npmjs.com/package/n8n-nodes-domainkits), same API, same key
- [About DomainKits and ABTdomain](https://domainkits.com/about)
- [ABTdomain](https://abtdomain.com)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Privacy Policy](https://domainkits.com/privacy)
- [Terms of Service](https://domainkits.com/terms)

## License

[MIT](LICENSE.md)
