/**
 * useSolanaCheckout
 *
 * Placeholder hook for Phantom/Solana wallet integration and USDC checkout.
 *
 * Phase 2 – Social-Marketplace Bridge
 *
 * IMPORTANT: This is a scaffold / placeholder.  Real Solana RPC calls and
 * Phantom wallet adapter wiring should be added once the `@solana/web3.js` and
 * `@solana/spl-token` packages are installed and the network endpoint is
 * configured.
 */

import { useCallback, useState } from 'react';
import { MarketplaceProduct } from '../../src/types/marketplace';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WalletConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

export type CheckoutStatus =
  | 'idle'
  | 'preparing'
  | 'awaiting_approval'
  | 'submitted'
  | 'confirmed'
  | 'failed';

export interface SolanaCheckoutState {
  /** Current Phantom wallet connection status. */
  walletStatus: WalletConnectionStatus;
  /** Public key of the connected wallet, if any. */
  walletPublicKey: string | null;
  /** Current checkout / transaction lifecycle status. */
  checkoutStatus: CheckoutStatus;
  /** Solana transaction signature once submitted. */
  transactionSignature: string | null;
  /** Human-readable error message, if any. */
  errorMessage: string | null;
}

export interface UseSolanaCheckoutReturn extends SolanaCheckoutState {
  /** Connect to Phantom wallet. Resolves with the wallet's public key string. */
  connectWallet: () => Promise<string>;
  /** Disconnect the current wallet session. */
  disconnectWallet: () => void;
  /**
   * Initiate a USDC checkout for the given product.
   *
   * Workflow (to be implemented with real Solana SDK):
   *  1. Ensure wallet is connected (auto-connects if needed).
   *  2. Build a SPL-Token transfer instruction for the product price in USDC.
   *  3. Request transaction approval from Phantom.
   *  4. Broadcast signed transaction to the Solana network.
   *  5. Confirm transaction finality.
   */
  initiateCheckout: (product: MarketplaceProduct) => Promise<void>;
  /** Reset checkout state back to idle (e.g. after error or success). */
  resetCheckout: () => void;
}

// ---------------------------------------------------------------------------
// Constants (placeholders – replace with real values)
// ---------------------------------------------------------------------------

/** USDC SPL Token mint address on Solana Mainnet. */
const USDC_MINT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

/**
 * LBC Hub treasury wallet that receives payments.
 * IMPORTANT: Replace this with the real treasury address before enabling
 * production checkout.  `initiateCheckout` will throw if this value is still
 * the placeholder.
 */
const LBC_HUB_TREASURY_ADDRESS = 'REPLACE_WITH_REAL_TREASURY_ADDRESS';

/** Solana RPC endpoint. */
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useSolanaCheckout
 *
 * Manages Phantom wallet connection state and USDC payment preparation.
 * All Solana SDK calls are commented-out placeholders awaiting real
 * `@solana/web3.js` + `@solana/spl-token` integration.
 */
function useSolanaCheckout(): UseSolanaCheckoutReturn {
  const [state, setState] = useState<SolanaCheckoutState>({
    walletStatus: 'disconnected',
    walletPublicKey: null,
    checkoutStatus: 'idle',
    transactionSignature: null,
    errorMessage: null,
  });

  // ---------------------------------------------------------------------------
  // connectWallet
  // ---------------------------------------------------------------------------

  const connectWallet = useCallback(async (): Promise<string> => {
    setState((prev) => ({ ...prev, walletStatus: 'connecting', errorMessage: null }));

    try {
      // TODO: replace with real Phantom adapter call, e.g.:
      //   const { solana } = window as any;
      //   if (!solana?.isPhantom) throw new Error('Phantom wallet not found. Please install it.');
      //   const response = await solana.connect();
      //   const publicKey: string = response.publicKey.toString();

      // ─── Placeholder: simulate async connect ───────────────────────────────
      await simulateAsync(600);
      const publicKey = 'PHANTOM_PUBLIC_KEY_PLACEHOLDER';
      // ───────────────────────────────────────────────────────────────────────

      setState((prev) => ({
        ...prev,
        walletStatus: 'connected',
        walletPublicKey: publicKey,
      }));

      return publicKey;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        walletStatus: 'error',
        errorMessage: err instanceof Error ? err.message : 'Failed to connect wallet.',
      }));
      throw err;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // disconnectWallet
  // ---------------------------------------------------------------------------

  const disconnectWallet = useCallback(() => {
    // TODO: solana.disconnect();
    setState((prev) => ({
      ...prev,
      walletStatus: 'disconnected',
      walletPublicKey: null,
      checkoutStatus: 'idle',
      transactionSignature: null,
      errorMessage: null,
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // initiateCheckout
  // ---------------------------------------------------------------------------

  const initiateCheckout = useCallback(
    async (product: MarketplaceProduct) => {
      setState((prev) => ({
        ...prev,
        checkoutStatus: 'preparing',
        transactionSignature: null,
        errorMessage: null,
      }));

      try {
        // Step 0 – Guard: ensure treasury address has been configured.
        if (LBC_HUB_TREASURY_ADDRESS === 'REPLACE_WITH_REAL_TREASURY_ADDRESS') {
          throw new Error(
            'LBC Hub treasury address has not been configured. ' +
            'Set LBC_HUB_TREASURY_ADDRESS before enabling checkout.',
          );
        }

        // Step 1 – Ensure wallet is connected; connectWallet returns the public key.
        let publicKey = state.walletPublicKey;
        if (!publicKey || state.walletStatus !== 'connected') {
          publicKey = await connectWallet();
        }

        // Step 2 – Build SPL-Token USDC transfer instruction.
        // TODO:
        //   import { Connection, PublicKey, Transaction } from '@solana/web3.js';
        //   import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
        //
        //   const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
        //   const usdcMint = new PublicKey(USDC_MINT_ADDRESS);
        //   const senderPubkey = new PublicKey(publicKey);
        //   const recipientPubkey = new PublicKey(LBC_HUB_TREASURY_ADDRESS);
        //
        //   const senderATA = await getAssociatedTokenAddress(usdcMint, senderPubkey);
        //   const recipientATA = await getAssociatedTokenAddress(usdcMint, recipientPubkey);
        //
        //   // USDC has 6 decimals.
        //   const amountInMicroUsdc = BigInt(Math.round(product.price.usdc * 1_000_000));
        //
        //   const transferIx = createTransferInstruction(
        //     senderATA,
        //     recipientATA,
        //     senderPubkey,
        //     amountInMicroUsdc,
        //   );
        //
        //   const transaction = new Transaction().add(transferIx);
        //   transaction.feePayer = senderPubkey;
        //   transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        setState((prev) => ({ ...prev, checkoutStatus: 'awaiting_approval' }));

        // Step 3 – Request transaction approval from Phantom.
        // TODO:
        //   const { solana } = window as any;
        //   const signedTransaction = await solana.signTransaction(transaction);

        // ─── Placeholder: simulate wallet approval ─────────────────────────
        await simulateAsync(800);
        // ───────────────────────────────────────────────────────────────────

        // Step 4 – Broadcast signed transaction.
        // TODO:
        //   const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        //   await connection.confirmTransaction(signature, 'confirmed');

        // ─── Placeholder: simulate broadcast ──────────────────────────────
        await simulateAsync(1_200);
        const signature = 'PLACEHOLDER_TX_SIGNATURE';
        // ───────────────────────────────────────────────────────────────────

        setState((prev) => ({
          ...prev,
          checkoutStatus: 'confirmed',
          transactionSignature: signature,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          checkoutStatus: 'failed',
          errorMessage: err instanceof Error ? err.message : 'Transaction failed.',
        }));
      }
    },
    [connectWallet, state.walletPublicKey, state.walletStatus],
  );

  // ---------------------------------------------------------------------------
  // resetCheckout
  // ---------------------------------------------------------------------------

  const resetCheckout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      checkoutStatus: 'idle',
      transactionSignature: null,
      errorMessage: null,
    }));
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    initiateCheckout,
    resetCheckout,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Simulates an asynchronous delay – used for placeholder steps only. */
function simulateAsync(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Expose constants for integration / testing convenience.
export { USDC_MINT_ADDRESS, LBC_HUB_TREASURY_ADDRESS, SOLANA_RPC_ENDPOINT };

export default useSolanaCheckout;
