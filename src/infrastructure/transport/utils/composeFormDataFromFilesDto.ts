import type JSONValue from '../types/JSONValue';

/**
 * Converts JSON payload and files to FormData
 * @param payload - JSON payload that converts to FormData
 */
export const composeFormDataFromFilesDto = (payload: Record<string, JSONValue | undefined> | undefined): FormData => {
  const multipartFormData = new FormData();

  for (let key in payload) {
    const value = payload[key];

    if (value !== undefined) {
      const isPrimitive = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null;

      multipartFormData.append(key, isPrimitive ? String(value) : JSON.stringify(value));
    }
  }

  return multipartFormData;
};
