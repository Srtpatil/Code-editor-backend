#!/bin/bash


echo "adjusting logs"

echo "compiling"
exec  1> $"logfile.txt"
exec  2> $"errors"



g++ main.cpp
./a.out < input.txt

mv logfile.txt completed
