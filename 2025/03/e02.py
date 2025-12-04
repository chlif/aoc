import sys
from textwrap import wrap

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

input = []
with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            input.append(r)

sum = 0

def maxVoltage(bank, N):
    if N == 1:
        return max(bank)
    n0 = max(bank[:-(N-1)])
    n1i = bank.index(n0) + 1
    return n0 * pow(10, N-1) + maxVoltage(bank[n1i:], N-1)

for bank in input:
    jolt = [int(i) for i in wrap(bank,1)]
    sum += maxVoltage(jolt, 12)

print(sum)
            
