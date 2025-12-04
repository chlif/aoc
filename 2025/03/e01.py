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

for bank in input:
    jolt = [int(i) for i in wrap(bank,1)]
    t = max(jolt[:-1])
    o = max(jolt[jolt.index(t)+1:])
    sum += t*10 + o
    
print(sum)
            
