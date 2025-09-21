

def import_results(file):

    with open(file, 'r') as f:
        data = f.readlines()[46:-3]

    results = []
    for line in data:
        results.append(line.split())

    return results


def find_binders(results):

    binders = []
    for result in results:
        if result[-1] in ('WB', 'SB'):
            binders.append([result[2], result[1], result[-1]])

    return binders

print(find_binders(import_results('result.txt')))
