export const googleDocsScope = 'https://www.googleapis.com/auth/documents';
export const googleSheetsScope = 'https://www.googleapis.com/auth/spreadsheets';
export const googleSlidesScope =
  'https://www.googleapis.com/auth/presentations';

export function getGoogleApiHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}
