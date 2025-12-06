import sys
import re

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

calculations = []

with open(FILE, "r") as f:
    parts = []
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            numsN = [int(x) for x in re.findall(r"\d*", r) if x != ""]
            if len(numsN) > 0:
                parts.append(numsN)
            else:
                parts.append([x for x in re.findall(r"[\+\*]+", r)])
    
    for i in range(len(parts[0])):
        calculations.append([])
        for j in range(len(parts)):
            calculations[i].append(parts[j][i])

def multiply(arr):
    res = 1
    for i in arr:
        res *= i
    return res

def sum(arr):
    res = 0
    for i in arr:
        res += i
    return res

total = 0
for c in calculations:
    if c[len(c)-1] == '+':
        total += sum(c[:-1])
    else:
        total += multiply(c[:-1])

print(total)
