#!/usr/bin/env nextflow

process run_netchop {

    publishDir "results/netchop/", mode: 'copy'

    input: 
        val input

    output:
        path 'netchop_results.csv'

    script:
    """
        cwd=\${PWD}
        cd ~/Documents/immune-epitope-prediction
        mkdir -p results/netchop/
        docker run --rm -v ${PWD}:/data netchop -m netchop $input > netchop_results.csv
    """

}

workflow {
    run_netchop(params.input)
}
