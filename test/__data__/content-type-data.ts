import { validBrowserHeaders } from './test-user-agents';

export const headersWithoutConnection = { ...validBrowserHeaders };
delete headersWithoutConnection['connection'];

export const headersWithoutContentType = { ...validBrowserHeaders };
delete headersWithoutContentType['content-type'];
