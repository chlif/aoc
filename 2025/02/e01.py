import sys

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
    l = len(str(i))
    p = int( l / 2 )
    if l % 2 != 0:
        return False
    return str(i)[:p] == str(i)[p:]

for r in input.split(","):
    l,h = [int(x) for x in r.split("-")]
    for i in range(l,h+1):
        if isInvalid(i):
            invalidSum += i

print(invalidSum)
