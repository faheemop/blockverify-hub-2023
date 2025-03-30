
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "verified":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    case "pending":
    default:
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
  }
};
