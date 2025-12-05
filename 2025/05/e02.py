import sys
import re

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

ranges = []

with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            a = re.search(r"^([0-9]*)\-([0-9]*)$", r)
            if a != None:
                ranges.append((int(a.group(1)), int(a.group(2))))

def replace(r, i,l,h):
    return r[:i] + [(l,h)] + r[i+1:]

def remove(r, i):
    return r[:i] + r[i+1:]

idx = 0
while True:
    changed = False

    r0 = ranges[idx]
    rGroup = ranges[idx+1:]

    for j, rn in enumerate(rGroup):
        if r0[0] > rn[1] or r0[1] < rn[0]:
            continue
        elif r0[0] >= rn[0] and r0[1] <= rn[1]:
            ranges = remove(ranges, idx)
            changed = True
        elif r0[0] <= rn[0] and r0[1] >= rn[1]:
            ranges = remove(ranges, idx+j+1)
            changed = True
        else:
            ranges = replace(ranges, idx, min(r0[0],rn[0]), max(r0[1],rn[1]))
            ranges = remove(ranges, idx+j+1)
            changed = True 
        break

    if not changed and idx == len(ranges)-1:
        break
    elif not changed:
        idx += 1

count = 0
for r in ranges:
    count += r[1] - r[0] + 1

print(count)