
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CompanyFiltersProps = {
  filter: 'all' | 'pending' | 'verified' | 'rejected';
  setFilter: (value: 'all' | 'pending' | 'verified' | 'rejected') => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const CompanyFilters = ({ 
  filter, 
  setFilter, 
  searchTerm, 
  setSearchTerm 
}: CompanyFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, registration number..."
          className="pl-8 w-full sm:w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={filter} 
        onValueChange={(value) => setFilter(value as any)}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
