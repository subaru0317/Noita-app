#!/bin/bash

total_spells_size=0
total_spells_low_size=0

for file in ../public/spells/*.webp
do
    file_size=$(wc -c <"$file")
    total_spells_size=$(($total_spells_size + $file_size))
done

for file in ../public/spells_low/*.webp
do
    file_size=$(wc -c <"$file")
    total_spells_low_size=$(($total_spells_low_size + $file_size))
done

echo "Total size in spells: $total_spells_size bytes"
echo "Total size in spells_low: $total_spells_low_size bytes"
echo "Total difference: $(($total_spells_size-$total_spells_low_size)) bytes"
