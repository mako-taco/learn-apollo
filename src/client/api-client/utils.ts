import { APIResponse, APIErrorRespose, APISuccessResponse, APIResponsePromise } from './api-client';

/**
 * Disambiguates error responses from successful ones, and throws if there was an error
 */
export async function responseOk<T>(
  promise: APIResponsePromise<T>
): Promise<APISuccessResponse<T>> {
  const response = await promise;
  if (responseIsError(response)) {
    throw new Error(response.errors.join('\n'));
  }
  return response;
}

function responseIsError<T>(res: APIResponse<T>): res is APIErrorRespose {
  return Boolean((res as APIErrorRespose).errors);
}
