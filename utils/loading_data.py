import pandas as pd
import torch

df = pd.read_csv(
    "test.csv",
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
scores = torch.tensor(df["prediction_score"].values, dtype=torch.float32).cuda()


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


peptides = extract_peptides(amino_acids, scores)

# for length, seq in peptides:
#     print(f"{length}-mer: {seq}")
#
# # Save peptides to FASTA file
# i = 1
# with open("peptides.fsa", "w") as file:
#     for length, seq in peptides:
#         file.write(f">{i}\n{seq}\n")
#         i += 1

with open("peptides.pep", "w") as file:
    for length, seq in peptides:
        file.write(f"{seq}\n")
