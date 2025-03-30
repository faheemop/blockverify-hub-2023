
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Loader2, XCircle } from "lucide-react";
import { Company } from "@/types";

type CompanyActionsProps = {
  company: Company;
  isPending: boolean;
  onVerifyTransaction: (company: Company) => void;
  onVerificationUpdate: (companyId: string, status: 'verified' | 'rejected') => void;
};

export const CompanyActions = ({ 
  company, 
  isPending, 
  onVerifyTransaction,
  onVerificationUpdate
}: CompanyActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link to={`/company/${company.id}`}>
          View
        </Link>
      </Button>
      
      {company.verificationStatus === 'pending' && company.transactionId && (
        <>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onVerifyTransaction(company)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Verify TX'
            )}
          </Button>
          
          <Button 
            size="sm" 
            variant="default" 
            onClick={() => onVerificationUpdate(company.id, 'verified')}
            disabled={isPending}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={() => onVerificationUpdate(company.id, 'rejected')}
            disabled={isPending}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </>
      )}
      
      {company.transactionId && (
        <Button 
          size="sm" 
          variant="ghost" 
          asChild
        >
          <a 
            href={`https://mempool.space/tx/${company.transactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
};
