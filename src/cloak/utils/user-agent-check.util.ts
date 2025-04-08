import { botReasons } from '../constants';
import { suspiciousUserAgentsSet } from '../data';

export const userAgentCheckUtil = (userAgentRaw: string): string | null => {
    const userAgent = userAgentRaw?.toLowerCase() ?? '';

    for (const keyword of suspiciousUserAgentsSet) {
        if (userAgent.includes(keyword)) {
            return `${botReasons.USER_AGENT_SUSPICIOUS}: ${keyword}`;
        }
    }

    return null;
};
