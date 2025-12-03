import sys
from math import floor
from textwrap import wrap

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

input = ""
with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            input = r
            break

invalidSum = 0

def isInvalid(i):
    s = str(i)
    l = len(s)
    p = floor(l/2)

    for j in range(1,p+1):
        if l % j != 0:
            continue
        if s == s[:j] * int(l/j):
            return True
        
    return False 

for r in input.split(","):
    l,h = [int(x) for x in r.split("-")]
    for i in range(l,h+1):
        if isInvalid(i):
            invalidSum += i

print(invalidSum)
