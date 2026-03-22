/**
 * Sentinel Configuration — Lumina AI Security Protocols
 *
 * Controls authentication guards, rate-limiting, content moderation,
 * and AI-assisted threat detection for the LBC Hub Core platform.
 */

export type SentinelEnvironment = 'development' | 'staging' | 'production';

export interface RateLimitConfig {
  /** Max requests allowed within the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

export interface JwtConfig {
  /** Token expiry duration (e.g. "15m", "1h", "7d") */
  accessTokenExpiry: string;
  /** Refresh token expiry duration */
  refreshTokenExpiry: string;
  /** JWT signing algorithm */
  algorithm: 'HS256' | 'RS256' | 'ES256';
}

export interface ContentModerationConfig {
  enabled: boolean;
  /** Block posts/products that exceed this toxicity threshold (0–1) */
  toxicityThreshold: number;
  /** Auto-flag content for human review above this threshold (0–1) */
  flagThreshold: number;
  /** Lumina AI moderation model identifier */
  modelId: string;
}

export interface ThreatDetectionConfig {
  enabled: boolean;
  /** Anomaly detection sensitivity (0–1, higher = more sensitive) */
  sensitivity: number;
  /** Actions taken when a threat is detected */
  actions: ('log' | 'alert' | 'block' | 'quarantine')[];
}

export interface CorsConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowCredentials: boolean;
}

export interface SentinelConfig {
  environment: SentinelEnvironment;
  jwt: JwtConfig;
  rateLimit: {
    global: RateLimitConfig;
    auth: RateLimitConfig;
    api: RateLimitConfig;
  };
  contentModeration: ContentModerationConfig;
  threatDetection: ThreatDetectionConfig;
  cors: CorsConfig;
  /** Prestige-level users (Diamond) bypass standard rate limits */
  diamondBypassRateLimit: boolean;
  /** Audit log retention in days */
  auditLogRetentionDays: number;
}

const sentinelConfig: SentinelConfig = {
  environment: (process.env.NODE_ENV as SentinelEnvironment) ?? 'development',

  jwt: {
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
    algorithm: 'RS256',
  },

  rateLimit: {
    global: { maxRequests: 1000, windowSeconds: 60 },
    auth: { maxRequests: 10, windowSeconds: 60 },
    api: { maxRequests: 200, windowSeconds: 60 },
  },

  contentModeration: {
    enabled: true,
    toxicityThreshold: 0.85,
    flagThreshold: 0.6,
    modelId: 'lumina-moderation-v2',
  },

  threatDetection: {
    enabled: true,
    sensitivity: 0.75,
    actions: ['log', 'alert', 'block'],
  },

  cors: {
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? ['https://lbchub.com', 'https://app.lbchub.com']
        : ['http://localhost:3000', 'http://localhost:3001'],
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowCredentials: true,
  },

  diamondBypassRateLimit: false,
  auditLogRetentionDays: 90,
};

export default sentinelConfig;
