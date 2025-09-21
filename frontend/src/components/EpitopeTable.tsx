import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

export interface EpitopeData {
  hla: string;
  length: number;
  sequence: string;
  bindingScore: number;
}

interface EpitopeTableProps {
  data: EpitopeData[];
}

type SortField = keyof EpitopeData;
type SortDirection = "asc" | "desc";

export const EpitopeTable = ({ data }: EpitopeTableProps) => {
  const [sortField, setSortField] = useState<SortField>("bindingScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const exportCSV = () => {
    const headers = ["HLA", "Length", "Epitope Sequence", "Binding Score"];
    const csvContent = [
      headers.join(","),
      ...sortedData.map(row => [
        row.hla,
        row.length,
        row.sequence,
        row.bindingScore.toFixed(3)
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "epitope-analysis.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="h-4 w-4 text-primary" /> : 
      <ChevronDown className="h-4 w-4 text-primary" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Epitope Analysis Results
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          disabled={data.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead 
                className="cursor-pointer hover:bg-muted select-none"
                onClick={() => handleSort("hla")}
              >
                <div className="flex items-center justify-between">
                  HLA
                  <SortIcon field="hla" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted select-none"
                onClick={() => handleSort("length")}
              >
                <div className="flex items-center justify-between">
                  Length
                  <SortIcon field="length" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted select-none"
                onClick={() => handleSort("sequence")}
              >
                <div className="flex items-center justify-between">
                  Epitope Sequence
                  <SortIcon field="sequence" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted select-none"
                onClick={() => handleSort("bindingScore")}
              >
                <div className="flex items-center justify-between">
                  Binding Score
                  <SortIcon field="bindingScore" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No epitope data available. Run analysis to see results.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((epitope, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{epitope.hla}</TableCell>
                  <TableCell>{epitope.length}</TableCell>
                  <TableCell className="font-mono text-sm">{epitope.sequence}</TableCell>
                  <TableCell>{epitope.bindingScore.toFixed(3)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};