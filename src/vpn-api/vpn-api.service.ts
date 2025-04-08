import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { vpnApiEndpoints } from './constants';
import { EnvName } from '../common/enums';
import { VpnApiCheckResponse, VpnApiSecurity } from './types';

@Injectable()
export class VpnApiService {
    constructor(private readonly configService: ConfigService) {}

    async getSecurityData(ip: string): Promise<VpnApiSecurity> {
        const response = await this.getVpnApiResponse(ip);

        return response.security;
    }

    private async getVpnApiResponse(ip: string): Promise<VpnApiCheckResponse> {
        const API_KEY = this.configService.get<string>(EnvName.VPN_API_KEY);
        const KEY_QUERY = '?key=';

        try {
            const { data } = await axios.get(
                `${vpnApiEndpoints.BASE}/${ip}${KEY_QUERY}${API_KEY}`
            );

            return data;
        } catch (err) {
            console.error('vpnapi.io failed:', err.message);
            return null;
        }
    }
}
