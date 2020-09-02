#!/bin/bash

compiler=$1
file=$2
output=$3

exec  1> $"logfile.txt"
exec  2> $"errors"

if [ "$output" = "" ]; then
    $compiler $file < $"input.txt"
else
    $compiler $file
    if [ $? -eq 0 ]; then
        $output < $"input.txt"
    fi
fi

mv logfile.txt completed
