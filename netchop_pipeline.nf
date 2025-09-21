#!/usr/bin/env nextflow

process run_netchop {
    errorStrategy 'ignore'

    publishDir "./netchop/", mode: 'copy'

    input: 
        val input

    output:
        path 'netchop_results.csv'

    script:
    """
        cwd=\${PWD}
        cd ~/Documents/immune-epitope-prediction
        mkdir -p netchop/
        docker run --rm -v ${PWD}:/data netchop -m netchop $input > netchop/netchop_results.csv
    """

}

workflow {
    run_netchop(params.input)
}
