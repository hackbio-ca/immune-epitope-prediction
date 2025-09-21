import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface InputSectionProps {
  onAnalyze: (sequence: string, threshold: number) => void;
  isLoading: boolean;
}

const defaultSequence = `>COVID-19 Spike Protein Fragment
YLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNV`;

export const InputSection = ({ onAnalyze, isLoading }: InputSectionProps) => {
  const [sequence, setSequence] = useState(defaultSequence);
  const [threshold, setThreshold] = useState([0.5]);

  const handleAnalyze = () => {
    onAnalyze(sequence, threshold[0]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <div>
          <Label htmlFor="sequence" className="text-base font-medium">
            Peptide Sequence Input
          </Label>
          <Textarea
            id="sequence"
            placeholder="Paste your peptide sequence or FASTA format here..."
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="mt-2 min-h-[120px] font-mono text-sm"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-medium">Binding Threshold</Label>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              {threshold[0].toFixed(2)}
            </span>
          </div>
          <Slider
            value={threshold}
            onValueChange={setThreshold}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <Button 
          onClick={handleAnalyze}
          className="w-full"
          size="lg"
          disabled={isLoading || !sequence.trim()}
        >
          <Search className="mr-2 h-5 w-5" />
          {isLoading ? "Analyzing..." : "Analyze Vaccine Design"}
        </Button>
      </div>
    </div>
  );
};