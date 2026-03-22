/**
 * Tests for the Founding Citizen Genesis Badge feature.
 */

import { assignGenesisBadge, GENESIS_LIMIT } from "../identity";
import { InMemoryDatabase } from "../db";

describe("assignGenesisBadge", () => {
  let db: InMemoryDatabase;

  beforeEach(() => {
    db = new InMemoryDatabase();
  });

  it("grants ASCENDED status to the first user", async () => {
    const result = await assignGenesisBadge("wallet-001", db);

    expect(result.status).toBe("ASCENDED");
    if (result.status === "ASCENDED") {
      expect(result.remainingSlots).toBe(99);
      expect(result.message).toContain("Founding Citizen");
    }
  });

  it("persists the FOUNDING_CITIZEN_GENESIS badge on the user profile", async () => {
    await assignGenesisBadge("wallet-001", db);

    const profile = db.getProfile("wallet-001");
    expect(profile).toBeDefined();
    expect(profile?.badges).toContain("FOUNDING_CITIZEN_GENESIS");
    expect(profile?.prestigeLevel).toBe("Diamond Tier 💎");
    expect(profile?.joinDate).toBeTruthy();
  });

  it("correctly decrements remainingSlots with each new founding citizen", async () => {
    await assignGenesisBadge("wallet-001", db);
    const result = await assignGenesisBadge("wallet-002", db);

    expect(result.status).toBe("ASCENDED");
    if (result.status === "ASCENDED") {
      expect(result.remainingSlots).toBe(98);
    }
  });

  it("returns CLOSED status when the genesis limit has been reached", async () => {
    // Fill all 100 slots
    for (let i = 0; i < GENESIS_LIMIT; i++) {
      await assignGenesisBadge(`wallet-${i.toString().padStart(3, "0")}`, db);
    }

    const lateResult = await assignGenesisBadge("wallet-late", db);

    expect(lateResult.status).toBe("CLOSED");
    expect(lateResult.message).toBe("Genesis Phase Complete.");
  });

  it("returns 0 remainingSlots for the 100th founding citizen", async () => {
    // Fill 99 slots first
    for (let i = 0; i < GENESIS_LIMIT - 1; i++) {
      await assignGenesisBadge(`wallet-${i.toString().padStart(3, "0")}`, db);
    }

    const lastResult = await assignGenesisBadge("wallet-100", db);

    expect(lastResult.status).toBe("ASCENDED");
    if (lastResult.status === "ASCENDED") {
      expect(lastResult.remainingSlots).toBe(0);
    }
  });
});
