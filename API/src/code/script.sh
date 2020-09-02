#!/bin/bash

exec  1> $"logfile.txt"
exec  2> $"error.txt"



g++ main.cpp
./a.out < input.txt

cp logfile.txt output.txt
