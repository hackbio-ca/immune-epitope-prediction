
mkdir -p results/netchop/
docker run --rm -v $(pwd):/data netchop -m netchop data.fsa > results/netchop/netchop_results.txt

mkdir -p results/peptides/
source hackathon_env/bin/activate
python3 utils/loading_data.py -f results/netchop/netchop_results.txt -o results/peptides/peptides.fsa
deactivate

mkdir -p results/netmhcpan/

alleles=()
while IFS= read -r line || [[ -n "$line" ]]; do
    alleles+=("$line")
done < alleles.txt

for allele in "${alleles[@]}"; do
  mkdir -p results/netmhcpan/$allele/
  docker run --rm -v $(pwd):/data netmhcpan -BA -a $allele -p results/peptides/peptides.fsa > results/netmhcpan/$allele/results.csv
  source hackathon_env/bin/activate
  python3 utils/netMHCpan_results.py -f results/netmhcpan/$allele/results.csv -o results/netmhcpan/$allele/binders.csv
  deactivate 
done

