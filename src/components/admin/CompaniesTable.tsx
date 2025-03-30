
import { Company } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { CompanyActions } from "./CompanyActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CompaniesTableProps = {
  companies: Company[];
  isPending: boolean;
  onVerifyTransaction: (company: Company) => void;
  onVerificationUpdate: (companyId: string, status: 'verified' | 'rejected') => void;
};

export const CompaniesTable = ({ 
  companies, 
  isPending, 
  onVerifyTransaction, 
  onVerificationUpdate 
}: CompaniesTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No verification requests found
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.country}#{company.registrationNumber}</TableCell>
                <TableCell>{company.createdAt.toLocaleDateString()}</TableCell>
                <TableCell><StatusBadge status={company.verificationStatus} /></TableCell>
                <TableCell className="text-right">
                  <CompanyActions 
                    company={company} 
                    isPending={isPending}
                    onVerifyTransaction={onVerifyTransaction}
                    onVerificationUpdate={onVerificationUpdate}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
