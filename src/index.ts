#!/usr/bin/env node
import { createInterface } from 'node:readline';

const ENDPOINT = process.env.DOMAINKITS_MCP_URL ?? 'https://api.domainkits.com/v1/mcp';
const API_KEY = process.env.DOMAINKITS_API_KEY ?? '';
const REQUEST_TIMEOUT_MS = 120_000;

type JsonRpcId = string | number | null;

interface JsonRpcMessage {
	jsonrpc?: string;
	id?: JsonRpcId;
	method?: string;
	params?: unknown;
	result?: unknown;
	error?: unknown;
}

function write(message: JsonRpcMessage): void {
	process.stdout.write(JSON.stringify(message) + '\n');
}

function errorResponse(id: JsonRpcId, code: number, message: string): void {
	write({ jsonrpc: '2.0', id, error: { code, message } });
}

async function forward(message: JsonRpcMessage): Promise<void> {
	const id = message.id ?? null;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

	try {
		const response = await fetch(ENDPOINT, {
			method: 'POST',
			headers,
			body: JSON.stringify(message),
			signal: controller.signal,
		});

		const text = await response.text();

		if (!response.ok) {
			if (id !== null) {
				errorResponse(id, -32000, `DomainKits API returned ${response.status}: ${text.slice(0, 200)}`);
			}
			return;
		}

		if (id === null) return;

		try {
			write(JSON.parse(text) as JsonRpcMessage);
		} catch {
			errorResponse(id, -32700, 'DomainKits API returned a malformed response');
		}
	} catch (error) {
		if (id === null) return;
		const reason = error instanceof Error && error.name === 'AbortError'
			? `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s`
			: error instanceof Error
				? error.message
				: 'Unknown transport error';
		errorResponse(id, -32000, reason);
	} finally {
		clearTimeout(timer);
	}
}

function main(): void {
	if (!API_KEY) {
		process.stderr.write(
			'DOMAINKITS_API_KEY is not set. Running as guest with a low daily quota. ' +
				'Add a key to the env block of your client config to raise it.\n',
		);
	}

	const rl = createInterface({ input: process.stdin, terminal: false });
	const inFlight = new Set<Promise<void>>();

	rl.on('line', (line) => {
		const trimmed = line.trim();
		if (trimmed === '') return;

		let message: JsonRpcMessage;
		try {
			message = JSON.parse(trimmed) as JsonRpcMessage;
		} catch {
			errorResponse(null, -32700, 'Parse error');
			return;
		}

		const task = forward(message).finally(() => inFlight.delete(task));
		inFlight.add(task);
	});

	rl.on('close', () => {
		void Promise.allSettled([...inFlight]).then(() => process.exit(0));
	});
}

main();
