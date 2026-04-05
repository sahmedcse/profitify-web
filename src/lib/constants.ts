export const SITE_NAME = 'Profitify';
export const SITE_DESCRIPTION =
  'Track your portfolio performance, analyze market trends, and make data-driven financial decisions.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'development';
export const IS_PRODUCTION = APP_ENV === 'production';
