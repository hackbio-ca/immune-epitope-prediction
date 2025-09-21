import csv

def import_alleles(file):

    freqs = []
    with open(file, 'r') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')

        alleles = set()
        for row in csv_reader:
            if float(row[2]) > 0.01:
                alleles.add(row[0])

    return alleles

alleles = import_alleles('freqs.csv')

with open('alleles.txt', 'w', newline='') as file:
    for allele in alleles:
        file.write(f"{allele}\n")