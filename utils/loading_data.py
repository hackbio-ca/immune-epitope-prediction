import pandas as pd
import torch
import argparse


def get_cli_args():

    parser = argparse.ArgumentParser(
        description='Extract peptides from NetChop results'
    )

    parser.add_argument('-f', '--filename',
        required=True,
        type=str,
        help='Input results file from NetMHCpan path and name'                    
        )
    
    parser.add_argument('-o', '--output',
        required=True,
        type=str,
        help='Output file path and name')
    
    return parser.parse_args()


def read_results(filename):
    
    df = pd.read_csv(
        filename,
        sep=r"\s+",  # split on any whitespace
        skiprows=2,  # skip the first two lines
        header=None,  # no header
        names=[
            "index",
            "amino_acid",
            "prediction_score",
            "sequence_id",
            "extra1",
            "extra2",
        ],
    )

    # Keep only the columns we care about
    df = df[["amino_acid", "prediction_score"]]

    # Convert scores to float
    df["prediction_score"] = df["prediction_score"].astype(float)

    # Convert to numpy / torch
    amino_acids = df["amino_acid"].astype(str).values
    scores = torch.tensor(df["prediction_score"].values, dtype=torch.float32)

    return amino_acids, scores


# Peptide extraction function
def extract_peptides(amino_acids, scores, threshold=0.5, min_len=8, max_len=15):
    peptides = []
    n = len(amino_acids)
    i = 0
    while i < n:
        if scores[i] >= threshold:
            for L in range(min_len, max_len + 1):
                if i + L <= n:
                    if scores[i + L - 1] >= threshold:
                        peptide_seq = "".join(amino_acids[i : i + L])
                        peptides.append((L, peptide_seq))
            i += 1
            while i < n and scores[i] < threshold:
                i += 1
        else:
            i += 1
    return peptides


def main():
    args = get_cli_args() 
    amino_acids, scores = read_results(args.filename)

    peptides = extract_peptides(amino_acids, scores)

    with open(args.output, "w") as file:
        for length, seq in peptides:
            file.write(f"{seq}\n")


if __name__ == "__main__":
    main()