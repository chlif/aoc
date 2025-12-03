import sys

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

position = 50
count = 0

with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        move = int(r[1:])
        position = position + move if r[0] == "R" else position - move
        if position < 0:
            position = 100 - abs( position ) % 100 
        if position > 0:
            position = position % 100
        if position == 0:
            count += 1

print(count)