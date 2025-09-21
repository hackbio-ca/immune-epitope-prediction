
process extract_peptides {

    publishDir "results/peptides/", mode: 'copy'

    input: 
        val input

    output:
        path 'peptides.fsa'

    script:
    """
        source ~/Documents/immune-epitope-prediction/hackathon_env/bin/activate
        python3 ~/Documents/immune-epitope-prediction/utils/loading_data.py -f $input -o peptides.fsa
        deactivate
    """

}

process run_netmhcpan {

    publishDir "results/netmhcpan/", mode: 'copy'

    input: 
        path allele
        val input

    output: 


    script:
    """
        cwd=\${PWD}
        cd ~/Documents/immune-epitope-prediction
        mkdir -p netchop/
        docker run --rm -v ${PWD}:/data netchop -m netchop $input > results/netchop/netchop_results.csv
        docker run --rm -v ${PWD}:/data netmhcpan -BA -a $allele -p $input > results/netmhcpan/${allele}_results.csv
        mv results/netmhcpan/${allele}_results.csv \${cwd}
    """

}

process extract_binders {

    publishDir "results/binders/", mode: 'copy'

    input:


    output:


    script:
        """
            source ~/Documents/immune-epitope-prediction/hackathon_env/bin/activate
            python3 ~/Documents/immune-epitope-prediction/utils/loading_data.py -f $input -o peptides.fsa
            deactivate
        """
    
}




workflow {
    extract_peptides(params.input)

    alleleChannel = Channel.fromPath('./alleles.txt')

    run_netmhcpan(alleleChannel, extract_peptides.out)
}