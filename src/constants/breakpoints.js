/**
 * Shared responsive breakpoint queries. Keep this in sync with the matching
 * media query in src/styles/responsive.css if either one changes.
 */

/**
 * Tablet-class devices in landscape orientation (e.g. iPad, Android
 * tablets): wide enough to waste space on a phone-narrow layout, but short
 * enough that desktop-style vertical spacing doesn't fit comfortably.
 *
 * Gated on min-height as well as width, because some large phones exceed
 * 768px in width when rotated to landscape (e.g. an iPhone Pro Max is
 * ~930px) but stay well under 500px tall — width and orientation alone
 * would misclassify them as tablets.
 */
export const TABLET_LANDSCAPE_QUERY =
  '(min-width: 768px) and (max-width: 1180px) and (orientation: landscape) and (min-height: 500px)';
