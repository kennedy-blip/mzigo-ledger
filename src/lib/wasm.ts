import init, { quote_tariff, split_payouts, transition_shipment, validate_rate_card } from '../../rust-core/pkg/mzigo_core';

let initialized: Promise<unknown> | undefined;

export async function ready(): Promise<void> {
  initialized ??= init();
  await initialized;
}

async function ensureReady(): Promise<void> {
  await ready();
}

export async function quote(card: unknown, input: unknown) {
  await ensureReady();
  return quote_tariff(card, input) as any;
}

export async function split(input: unknown) {
  await ensureReady();
  return split_payouts(input) as any;
}

export async function transition(current: string, next: string) {
  await ensureReady();
  return transition_shipment(current, next);
}

export async function validate(card: unknown) {
  await ensureReady();
  return validate_rate_card(card);
}
