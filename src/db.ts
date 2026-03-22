/**
 * LBC HUB - IDENTITY PROTOCOL
 * Database abstraction layer for the Identity Protocol.
 * Authorized by: Founder Mokhtar Tarek Samara
 */

export interface UserProfile {
  walletAddress: string;
  badges: string[];
  prestigeLevel: string;
  joinDate: string;
}

export interface Database {
  getFoundingCitizenCount(): Promise<number>;
  updateUserProfile(
    walletAddress: string,
    updates: Partial<Omit<UserProfile, "walletAddress">>
  ): Promise<void>;
}

/**
 * In-memory database implementation used for development and testing.
 * Replace with a persistent store (e.g. PostgreSQL, Firestore) in production.
 */
export class InMemoryDatabase implements Database {
  private profiles: Map<string, UserProfile> = new Map();

  async getFoundingCitizenCount(): Promise<number> {
    let count = 0;
    for (const profile of this.profiles.values()) {
      if (profile.badges.includes("FOUNDING_CITIZEN_GENESIS")) {
        count++;
      }
    }
    return count;
  }

  async updateUserProfile(
    walletAddress: string,
    updates: Partial<Omit<UserProfile, "walletAddress">>
  ): Promise<void> {
    const existing = this.profiles.get(walletAddress) ?? {
      walletAddress,
      badges: [],
      prestigeLevel: "",
      joinDate: "",
    };
    this.profiles.set(walletAddress, { ...existing, ...updates });
  }

  /** Utility for testing: retrieve a stored profile. */
  getProfile(walletAddress: string): UserProfile | undefined {
    return this.profiles.get(walletAddress);
  }
}
