
import React, { useEffect, useState } from 'react';
import { checkTransactionConfirmations, verifyOpReturn } from '@/services/bitcoinService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface VerificationStatusProps {
  txId: string;
  expectedData: string;
  onRefresh?: () => void;
}

export function VerificationStatus({ txId, expectedData, onRefresh }: VerificationStatusProps) {
  const [status, setStatus] = useState<'loading' | 'verified' | 'unverified' | 'error'>('loading');
  const [confirmations, setConfirmations] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const verifyTransaction = async () => {
    try {
      setIsRefreshing(true);
      
      // Check if transaction has OP_RETURN data
      const isVerified = await verifyOpReturn(txId, expectedData);
      
      // Get confirmation count
      const confirmCount = await checkTransactionConfirmations(txId);
      setConfirmations(confirmCount);
      
      if (isVerified) {
        setStatus('verified');
      } else {
        setStatus('unverified');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (txId && expectedData) {
      verifyTransaction();
    }
  }, [txId, expectedData]);

  const handleRefresh = () => {
    setStatus('loading');
    verifyTransaction();
    if (onRefresh) onRefresh();
  };

  const getStatusColor = () => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'unverified': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'verified': return 'Transaction Verified';
      case 'unverified': return 'Verification Pending';
      case 'error': return 'Verification Error';
      default: return 'Checking Transaction...';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'verified': return <Check className="h-5 w-5" />;
      case 'unverified': return <Clock className="h-5 w-5" />;
      case 'error': return <AlertCircle className="h-5 w-5" />;
      default: return <RefreshCw className="h-5 w-5 animate-spin" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Verification Status</CardTitle>
        <CardDescription>
          Verification of blockchain transaction {txId.substring(0, 8)}...{txId.substring(txId.length - 8)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`${getStatusColor()} text-white`}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {getStatusText()}
            </span>
          </Badge>
          
          {confirmations > 0 && (
            <Badge variant="outline" className="bg-blue-500 text-white">
              {confirmations} Confirmation{confirmations !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        {status === 'loading' ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1">Transaction ID</div>
              <code className="px-2 py-1 bg-secondary rounded text-xs break-all">
                {txId}
              </code>
            </div>
            
            <div className="flex justify-between items-center">
              <a
                href={`https://www.blockchain.com/explorer/transactions/btc/${txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View on Blockchain Explorer
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
