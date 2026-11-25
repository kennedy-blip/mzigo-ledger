import { quote_tariff, split_payouts, transition_shipment, validate_rate_card } from '../../rust-core/pkg/mzigo_core';

export async function ready(): Promise<void> {
  // wasm-pack's bundler target initializes the module through its generated
  // ES module loader; it does not expose a callable default init function.
}

export async function quote(card: unknown, input: unknown) {
  return quote_tariff(card, input) as any;
}

export async function split(input: unknown) {
  return split_payouts(input) as any;
}

export async function transition(current: string, next: string) {
  return transition_shipment(current, next);
}

export async function validate(card: unknown) {
  return validate_rate_card(card);
}
