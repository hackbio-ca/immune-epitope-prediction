import argparse
import pandas as pd

def get_cli_args():

    parser = argparse.ArgumentParser(
        description='Extract weak and strong binding pMHC from NetMHCpan results'
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

def import_results(file):

    with open(file, 'r') as f:
        data = f.readlines()[46:-3]

    results = []
    for line in data:
        results.append(line.split())

    return results


def find_binders(results):
    """
    Creates a list of lists containing the Peptide, HLA Allele and qualitative
    binding strength (WB = Weak Binder, SB = Strong Binder).

    Input:
    results (list of lists): results list of lists containing NetMHCpan 4.1 
        binding affinity predictions

    Returns:
    binders (list of lists): list of lists containing only strong or weak
        binders
    """

    binders = []
    for result in results:
        if result[-1] in ('WB', 'SB'):
            binders.append([result[2], result[1], result[-1]])

    return binders


def export(binders, filename):
    """
    Export weak and strong binders to csv

    Input:
    binders (list of lists): list of lists containing only strong or weak
        binders
    filename (string): File name for export CSV

    Returns:
    None
    """

    binders_df = pd.DataFrame(binders)

    binders_df.to_csv(filename, index=False, header=['Peptide', 'Allele', 'Strength'])


def main():
    # Get command line argments
    args = get_cli_args()

    # Import results
    results = import_results(args.filename)
    
    # Extract only weak or strong binders
    binders = find_binders(results) 

    # Export to CSV
    export(binders, args.output)


if __name__ == "__main__":
    main()