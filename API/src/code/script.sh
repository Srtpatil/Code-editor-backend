#!/bin/bash

exec  1> $"logfile.txt"
exec  2> $"errors"



g++ main.cpp
./a.out < input.txt

mv logfile.txt completed
