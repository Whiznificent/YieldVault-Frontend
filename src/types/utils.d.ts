/**
 * Type declarations for JS utility modules that accept loose input types.
 */

declare module '../utils/validate.js' {
  export function validateDeposit(
    amount: string | number,
    balance: number,
  ): { valid: boolean; error: string | null };

  export function validateWithdraw(
    amount: string | number,
    deposited: number,
  ): { valid: boolean; error: string | null };

  export function isPositiveNumber(value: string): boolean;
  export function isStellarAddress(address: string): boolean;
  export function isValidPercent(value: string | number): boolean;
}

declare module '../utils/shares.js' {
  export function sharePrice(totalAssets: number, totalShares: number): number;
  export function previewDeposit(
    amount: string | number,
    totalAssets: number,
    totalShares: number,
  ): number;
  export function previewRedeem(
    shares: string | number,
    totalAssets: number,
    totalShares: number,
  ): number;
  export function previewWithdraw(
    amount: string | number,
    totalAssets: number,
    totalShares: number,
  ): number;
}

declare module '../utils/format.js' {
  export function formatAmount(value: number, decimals?: number): string;
  export function formatCompact(value: number): string;
  export function formatShares(value: number, decimals?: number): string;
  export function formatPercent(value: number, decimals?: number): string;
  export function formatUsd(value: number): string;
  export function formatApy(value: number, decimals?: number): string;
  export function projectedYield(principal: number, apy: number): number;
  export function formatSigned(value: number, decimals?: number): string;
  export function shortenAddress(address: string): string;
  export function clamp(value: number, min: number, max: number): number;
  export function formatDate(
    date: Date | string | number,
    timeZone?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string;
}
