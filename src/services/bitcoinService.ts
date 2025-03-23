
// Bitcoin blockchain explorer API
const BLOCKCHAIN_API = 'https://blockstream.info/api';

// Get transaction details
export const getTransactionDetails = async (txId: string) => {
  try {
    const response = await fetch(`${BLOCKCHAIN_API}/tx/${txId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction details: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
};

// Verify OP_RETURN data in a transaction
export const verifyOpReturn = async (txId: string, expectedData: string): Promise<boolean> => {
  try {
    const tx = await getTransactionDetails(txId);
    
    // Look for OP_RETURN outputs
    if (tx && tx.vout) {
      for (const output of tx.vout) {
        if (
          output.scriptpubkey_type === 'op_return' && 
          output.scriptpubkey_asm.includes(expectedData)
        ) {
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error verifying OP_RETURN:', error);
    throw error;
  }
};
