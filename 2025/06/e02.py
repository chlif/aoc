import sys
import re

FILE = "test.txt" if "-t" in sys.argv else "input.txt"

calculations = []
input = []

with open(FILE, "r") as f:
    parts = []
    for r in f:
        r = r.replace("\n", "")
        if len(r) > 0:
            input.append(r)

cols = []
prev = 0
for i,c in enumerate(input[-1]):
    if c != ' ' and i != 0:
        cols.append([prev, i-2])
        prev = i
cols.append([prev,len(input[-1])-1])

calculations = [["" for r in range(c[1]-c[0]+1)] for c in cols]

for inputRow in input[:-1]:
    for i, col in enumerate(cols):
        chars = inputRow[col[0]:col[1]+1]
        for n,c in enumerate(chars):
            calculations[i][n] = calculations[i][n] + c

for i, calc in enumerate(calculations):
    for j, chars in enumerate(calc):
        calculations[i][j] = int(chars)

for i, col in enumerate(cols):
    calculations[i].append(input[-1][col[0]])


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
