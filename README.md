# @domainkits/mcp

MCP server for the [DomainKits](https://domainkits.com) domain data API.

It is a stdio transport for the hosted DomainKits MCP endpoint, written in TypeScript and run on Node.js through `npx`. Tool definitions, filtering and rate limiting live server-side, so the tool list stays current without republishing this package.

## What it does

It gives your most advanced AI better domain data, so it can research domains correctly. Your AI can analyze one domain, or a whole group of domains, from several technical angles:

- **Lifecycle**: [newly registered domains](https://github.com/ABTdomain/newly-registered-domains), [expired domains](https://github.com/ABTdomain/expired-domains), and deleted, aged, active and for-sale domains
- **Registration**: WHOIS data, the registrar, and what each EPP status code means
- **DNS and hosting**: DNS records, the network behind an IP, and other domains on the same nameserver
- **Footprint**: the same name across TLDs, and typosquat variants around a brand
- **Backlinks**: backlink profile and spam score
- **Price**: availability, registration price, and aftermarket listing and price
- **Keywords and trends**: search volume for a keyword, and keyword and TLD registration trends
- **Changes**: monitoring of WHOIS, DNS and page content

<p align="center">
<a href="https://www.youtube.com/watch?v=zHJOUzDx6eM"><img src="https://img.youtube.com/vi/zHJOUzDx6eM/maxresdefault.jpg" alt="Video: Feed your AI domain data with DomainKits MCP" width="640"></a><br>
<a href="https://www.youtube.com/watch?v=zHJOUzDx6eM">▶ Watch on YouTube: Feed Your AI Domain Data with DomainKits MCP</a>
</p>

## Tools

| Tool | What it does |
|---|---|
| `nrds` | Search newly registered domains, or browse one TLD |
| `expired` | Search domains in the deletion cycle: expired, in redemption, or pending delete |
| `deleted` | Search dropped domains, as of the latest data update (confirm availability before registering) |
| `aged` | Search registered domains with a long history |
| `active` | Search currently registered gTLD domains |
| `market` | Search registered domains carrying marketplace listing data |
| `available` | Confirm one domain's registrability and price |
| `bulk_available` | Registration status for a batch of domains in one call |
| `bulk_tld` | How many TLDs each keyword in a batch is registered in (counts) |
| `tld_check` | Check how a prefix is registered across the core TLDs |
| `whois` | WHOIS/RDAP registration data: registrar, dates, status, nameservers |
| `dns` | Resolve a domain's DNS records |
| `ns_reverse` | List the gTLD domains hosted on one nameserver |
| `domain_changes` | Recent registration and status changes to premium .com names |
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
| `unregistered_short_domains` | Unregistered short names in .ai and a few other TLDs, by letter pattern |
| `typosquat` | Generate typosquat variants of a domain and check which are registered |
| `usage` | Your account's current usage |
| `monitor` | Manage domain monitoring tasks across WHOIS, DNS and page content |
| `preferences` | Manage saved preferences and the memory switch |
| `strategy` | Store your own strategy text and its run results |

Your MCP client reads the current tool list from the endpoint. The same list is on [domainkits.com/mcp](https://domainkits.com/mcp#tools).

## Install

No install step. Point your MCP client at the package and `npx` fetches it on first run.

**Claude Desktop**: add to `claude_desktop_config.json`:

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

Any MCP client that speaks stdio works with the same config.

The `env` block holds your API key and is optional. The same key works for this MCP server, the REST API and the n8n node. This package does not write the key to disk.

Sign up at [domainkits.com](https://domainkits.com) to get a key and use it for free. Paid plans give you more.

## Privacy

Search and lookup tools are stateless: nothing you ask is retained. Three tools do store data across sessions, by design:

| Tool | What it stores |
|---|---|
| `monitor` | The domains you watch and the results of each check |
| `preferences` | Your saved preferences and the memory switch |
| `strategy` | Strategy text you wrote, run timestamps and the most recent result |

Storage is opt-in. Memory is off by default and must be enabled through `preferences` before `monitor` or `strategy` will accept anything. Stored data is encrypted at rest in isolated per-user directories, persists across MCP clients under the same account, and can be deleted in full at any time with `preferences` `action: delete`.

Full details: [Privacy Policy](https://domainkits.com/privacy) | [Terms of Service](https://domainkits.com/terms)

No tool returns domain registrant personal data. `registrar` returns ICANN-published registrar business contacts.

## Use it for

### [Newly registered domains](https://github.com/ABTdomain/newly-registered-domains)

<p align="center">
<a href="https://www.youtube.com/watch?v=_9kJQAIkxlI"><img src="https://img.youtube.com/vi/_9kJQAIkxlI/maxresdefault.jpg" alt="Video: How to investigate newly registered domains with AI using the DomainKits MCP server" width="640"></a><br>
<a href="https://www.youtube.com/watch?v=_9kJQAIkxlI">▶ Watch on YouTube: How to Investigate Newly Registered Domains With AI</a>
</p>

### [Expired domains](https://github.com/ABTdomain/expired-domains)

<p align="center">
<a href="https://www.youtube.com/watch?v=aOL1TiX0SuU"><img src="https://img.youtube.com/vi/aOL1TiX0SuU/maxresdefault.jpg" alt="Video: Find a great .com before it drops with the DomainKits MCP server" width="640"></a><br>
<a href="https://www.youtube.com/watch?v=aOL1TiX0SuU">▶ Watch on YouTube: Find a Great .com Before It Drops</a>
</p>

## Related

- [ABTdomain/domainkits-mcp](https://github.com/ABTdomain/domainkits-mcp): the same server over HTTP, for clients that support remote MCP
- [ABTdomain/domainkits-skills](https://github.com/ABTdomain/domainkits-skills): agent skills that run on DomainKits MCP
- [ABTdomain/domainkits-cli](https://github.com/ABTdomain/domainkits-cli): command-line client for the DomainKits domain data API
- [ABTdomain/domainkits-sdk-py](https://github.com/ABTdomain/domainkits-sdk-py): Python client for the DomainKits domain data API

## Resources

- [DomainKits MCP](https://domainkits.com/mcp)
- [About DomainKits and ABTdomain](https://domainkits.com/about)
- [ABTdomain](https://abtdomain.com)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Privacy Policy](https://domainkits.com/privacy)
- [Terms of Service](https://domainkits.com/terms)

## License

[MIT](LICENSE.md)
