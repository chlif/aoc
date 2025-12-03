import sys

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

input = []
with open(FILE, "r") as f:
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            input.append(r.replace("\n", ""))

