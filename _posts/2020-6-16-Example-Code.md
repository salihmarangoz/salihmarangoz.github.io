---
layout: post
type: blog
title: Example Code
#feature-img: "/images/projects/ImageGenerationGeneticAlgorithm.png"
toc: true
mathjax: true
comments: true
published: true
---

Example codes below:

```python
operators = ['-', '+', '/', '*'] # Priority increases from left to right. https://www.purplemath.com/modules/orderops.htm
commands = ['e', '=']

# https://www.oreilly.com/library/view/python-cookbook/0596001673/ch03s07.html
def containsAny(str, set):
    return 1 in [c in str for c in set]

def isOperator(s):
    if (len(s) == 1 and containsAny(s, operators)):
        return True
    return False

def isCommand(s):
    if (len(s) == 1 and containsAny(s, commands)):
        return True
    return False

# https://stackoverflow.com/a/46342985
def isValue(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def parseValue(s):
    # DISABLED BECAUSE CAUSING INTEGER DIVISION
    # https://stackoverflow.com/questions/46647744/checking-to-see-if-a-string-is-an-integer-or-float
    #if s.isdigit():
    #    numeric_value = int(s)
    #else:
    #    numeric_value = float(s)
    #return numeric_value
    return float(s)

# s should be "value" or "value operator value" or "value operator value operator value" ...
# https://levelup.gitconnected.com/3-ways-to-write-a-calculator-in-python-61642f2e4a9a
def calculate(s):
    if not containsAny(s, operators):
        return parseValue(s)
    
    i = 0
    search = True
    while search and i<len(operators):
        pos = s.find(operators[i]) # will be the index of the first lowest priority operator  https://stackoverflow.com/a/2294502
        if (pos >= 0): 
            search = False
        else:
            i += 1

    # https://www.journaldev.com/23584/python-slice-string
    left = s[:pos]
    right = s[pos+1:]

    if (s[pos] == '-'):
        return calculate(left) - calculate(right)
    elif (s[pos] == '+'):
        return calculate(left) + calculate(right)
    elif (s[pos] == '/'):
        return calculate(left) / calculate(right)
    elif (s[pos] == '*'):
        return calculate(left) * calculate(right)

def main():
    is_inputting = True
    input_str = ""
    print("Application started.")

    while (is_inputting):
        while (is_inputting):
            s = input() # https://www.w3schools.com/python/ref_func_input.asp
            s_trimmed = s.strip() # https://www.w3schools.com/python/ref_string_strip.asp
            if (isValue(s_trimmed)):
                input_str += s_trimmed
                break # https://www.programiz.com/python-programming/break-continue
            print("Please enter number or e for exit!")

        while (is_inputting):
            s = input()
            s_trimmed = s.strip()
            if (isOperator(s_trimmed)):
                input_str += s_trimmed
                break
            elif (isCommand(s_trimmed) and s_trimmed.lower() == "e"): # https://www.programiz.com/python-programming/methods/string/lower
                is_inputting = False
                break
            elif (isCommand(s_trimmed) and s_trimmed == "="):
                is_inputting = False
                print( calculate(input_str) )
                break

            print("Please enter valid operator or e for exit!")

    print("Finished")


# https://www.guru99.com/learn-python-main-function-with-examples-understand-main.html
if __name__ == "__main__":
    main()
```

