import { botReasons, headerValues } from '../constants';

export const connectionCheckUtil = (connection?: string): string | null => {
    if (!connection) return botReasons.MISSING_CONNECTION_HEADER;

    const value = connection.toLowerCase();

    if (value !== headerValues.CONNECTION_KEEP_ALIVE) {
        return `${botReasons.MISSING_CONNECTION_HEADER}: "${connection}"`;
    }

    return null;
};
