
import csv

def import_freqs(file):

    freqs = []
    with open(file, 'r') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')

        header = next(csv_reader)

        header[1] = 'European'
        header[3] = 'African'
        header[5] = 'Asian'
        header[7] = 'Hispanic'

        for row in csv_reader:
            HLA = "HLA-" + header[0].replace('\ufeff', '') + "*" + row[0][0:2] + ":" + row[0][2:4]
            # Europe
            freqs.append([HLA, header[1], row[1]])
            # Africa
            freqs.append([HLA, header[3], row[3]])
            # Asia
            freqs.append([HLA, header[5], row[5]])
            # Hispanic
            freqs.append([HLA, header[7], row[7]])

    return freqs

A_freqs = import_freqs("ref_files/A-frequencies.csv")
B_freqs = import_freqs("ref_files/B-frequencies.csv")
C_freqs = import_freqs("ref_files/C-frequencies.csv")

freqs_tmp = A_freqs + B_freqs + C_freqs

freqs = []

for row in freqs_tmp:
    if float(row[2]) != 0:
        freqs.append(row)

with open('freqs.csv', 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerows(freqs)