import { Dna } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-scientific-header border-b border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-2 bg-primary rounded-lg">
            <Dna className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              HLA-Immune Epitope Prediction
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Peptide-Based Vaccine Design Assistant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};