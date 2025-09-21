import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Award } from "lucide-react";

interface SummaryCardsProps {
  epitopeCount?: number;
  optimalHLA?: string;
}

export const SummaryCards = ({ epitopeCount, optimalHLA }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Epitopes Identified
          </CardTitle>
          <Target className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {epitopeCount !== undefined ? epitopeCount : "—"}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Optimal HLA Match
          </CardTitle>
          <Award className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {optimalHLA || "—"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};