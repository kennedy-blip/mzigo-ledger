import * as wasm from '../../rust-core/pkg/mzigo_core';

let initialized: Promise<void> | undefined;

export async function ready(): Promise<void> {
  initialized ??= (async () => {
    const initialize = (wasm as unknown as { default?: () => Promise<unknown> }).default;
    if (typeof initialize !== 'function') {
      throw new Error('The generated WebAssembly module has no async initializer.');
    }
    await initialize();
  })();
  await initialized;
}

export async function quote(card: unknown, input: unknown) {
  await ready();
  return wasm.quote_tariff(card, input) as any;
}

export async function split(input: unknown) {
  await ready();
  return wasm.split_payouts(input) as any;
}

export async function transition(current: string, next: string) {
  await ready();
  return wasm.transition_shipment(current, next);
}

export async function validate(card: unknown) {
  await ready();
  return wasm.validate_rate_card(card);
}
