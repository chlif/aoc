import sys
import re

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

ranges = []
itemIds = []

with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            a = re.search(r"^([0-9]*)\-([0-9]*)$", r)
            b = re.search(r"^([0-9]*)$", r)
            if a != None:
                ranges.append((int(a.group(1)), int(a.group(2))))
            elif b != None:
                itemIds.append(int(b.group(1)))

count = 0        
for id in itemIds:
    for r in ranges:
        if id >= r[0] and id <= r[1]:
            count += 1
            break

print(count)