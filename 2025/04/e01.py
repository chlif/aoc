import sys
from textwrap import wrap

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

map = ""
w = 0
with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            w = len(r)
            map += r

def isDeltaInMap(i,d):
    if i+d < 0 or i+d >= len(map):
        return False
    if i%w == 0 and (i+d)%w == w-1:
        return False
    if i%w == w-1 and (i+d)%w == 0:
        return False
    return True
    

def getAdjacent(i):
    adj = [-w-1,-w,-w+1,-1,1,w-1,w,w+1]
    return [ map[i+d] for d in adj if isDeltaInMap(i,d) ]

count = 0

for i in range(len(map)):
    if map[i] == '@':
        if len([x for x in getAdjacent(i) if x == '@']) < 4:
            count += 1

print(count)