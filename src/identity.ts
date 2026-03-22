/**
 * LBC HUB - IDENTITY PROTOCOL
 * Feature: Founding Citizen Genesis Badge (First 100)
 * Authorized by: Founder Mokhtar Tarek Samara
 */

import { Database } from "./db";

export const GENESIS_LIMIT = 100;

export interface GenesisAscendedResult {
  status: "ASCENDED";
  message: string;
  remainingSlots: number;
}

export interface GenesisClosedResult {
  status: "CLOSED";
  message: string;
}

export type GenesisResult = GenesisAscendedResult | GenesisClosedResult;

/**
 * Assigns the Founding Citizen Genesis Badge to a user if a slot is available.
 *
 * @param userWalletAddress - The wallet address of the user seeking a genesis slot.
 * @param db - The database instance to use for persisting the badge assignment.
 * @returns A result object indicating whether the user ascended or whether the
 *          genesis phase is already closed.
 */
export async function assignGenesisBadge(
  userWalletAddress: string,
  db: Database
): Promise<GenesisResult> {
  // 1. Check the current count of Founding Citizens
  const foundingCount = await db.getFoundingCitizenCount();

  if (foundingCount < GENESIS_LIMIT) {
    console.log(`Lumina AI: Slot ${foundingCount + 1}/100 detected. 🏆`);

    // 2. Assign the 'Soulbound' Genesis Flag to the User's Digital Mirror
    await db.updateUserProfile(userWalletAddress, {
      badges: ["FOUNDING_CITIZEN_GENESIS"],
      prestigeLevel: "Diamond Tier 💎",
      joinDate: new Date().toISOString(),
    });

    // 3. Signal a special UI animation for the user
    return {
      status: "ASCENDED",
      message:
        "Welcome, Founding Citizen. Your legacy is secured in the LBC Hub. 🏛️",
      remainingSlots: GENESIS_LIMIT - (foundingCount + 1),
    };
  } else {
    return { status: "CLOSED", message: "Genesis Phase Complete." };
  }
}
