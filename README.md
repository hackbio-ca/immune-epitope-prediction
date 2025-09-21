# HLA-Immune Epitope Prediction

Predicting HLA-Immune Epitopes

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Abstract

The human immune system relies on Human Leukocyte Antigens (HLAs) to present peptide fragments from pathogens to immune cells, initiating immune responses. Understanding which HLAs bind to specific regions of the protein is critical for predicting immunogenicity, particularly in the context of infectious diseases, cancer, and transplant-related complications such as graft-versus-host disease (GvHD).

This project was inspired by the need for more streamlined and accessible tools for non-computational scientists. While existing platforms often require multiple inputs (such as protein sequences, HLA alleles, or complex configurations), this project simplifies the process by accepting primarily a protein sequence as input. It integrates and refines multiple prediction tools into a unified pipeline that outputs a ranked list of HLAs with strong or weak binding affinities, significantly reducing the manual effort and expertise required. 

By bridging protein sequence analysis with HLA binding prediction, this project aims to provide a simplified tool for non-computational researchers and clinicians with actionable insights for translational immunology and therapeutic innovation.

Potential Use Cases:
- Accelerate/Guide vaccine development by identifying key epitopes shared across common HLA haplotypes for a generalized vaccine against infectious diseases and/or a personalized cancer vaccines
- Minimize GvHD-related complications by minimizing self-antigen presentation from HLA disparity
  
Key Features:
- Offers a scalable, cost-effective approach to accurately identify priority immune targets for experimental validation
- Simplified interface for non-computational researchers and clinicians to use
- Lists common HLA overlaps with different regional population coverage

## Installation

Requirements:
- Python
- NetChop 3.0
- NetMHCpan 4.2

Clone the repository:
```bash
git clone https://github.com/hackbio-ca/immune-epitope-prediction.git
cd immune-epitope-prediction/
``````

NetChop Installation Instructions:
- Go to http://tools.iedb.org/netchop/download/
- Click on "Agree and Download"
- Put the downloaded tar.gz file in immune-epitope-prediction/docker/netchop/
- cd ..
- docker build -t netchop ./docker/netchop/

NetMHCpan Installation Instructions:
- Go to https://services.healthtech.dtu.dk/cgi-bin/sw_request?software=netMHCpan&version=4.2&packageversion=4.2b&platform=Linux
- Enter your information, agree to the terms, and click "Submit"
- Put the tar.gz emailed to you in immune-epitode-prediction/docker/netmhcpan/
- cd ..
- docker build -t netmhcpan ./docker/netmhcpan/

Create and activate a virtual environment (optional but recommended):
``````bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
``````

```bash
# Required Python packages
pip install requirements.txt
```

## Quick Start

Provide a basic usage example or minimal code snippet that demonstrates how to use the project.

# Example usage (Python)
import my_project

demo = my_project.example_function()
print(demo)
```
```r
# Example usage (R)
library(my_project)

demo <- example_function()
print(demo)
```

## Usage

Add detailed information and examples on how to use the project, covering its major features and functions.

```python
# More usage examples (Python)
import my_project

demo = my_project.advanced_function(parameter1='value1')
print(demo)
```
```r
# More usage examples (R)
library(demoProject)

demo <- advanced_function(parameter1 = "value1")
print(demo)
```

## Contribute

Contributions are welcome! If you'd like to contribute, please open an issue or submit a pull request. See the [contribution guidelines](CONTRIBUTING.md) for more information.

## Support

If you have any issues or need help, please open an [issue](https://github.com/hackbio-ca/demo-project/issues) or contact the project maintainers.

## License

This project is licensed under the [MIT License](LICENSE).
