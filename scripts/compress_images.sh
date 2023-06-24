#!/bin/bash

mkdir -p ../public/spells_low

total_original_size=0
total_new_size=0

for file in ../public/spells/*.webp
do
    original_size=$(wc -c <"$file")
    total_original_size=$(($total_original_size + $original_size))
    
    if [ $original_size -le 400 ]
    then
        echo "File: $(basename "$file") is already 400 bytes or less. No action taken."
        cp "$file" "../public/spells_low/$(basename "$file")"
        total_new_size=$(($total_new_size + $original_size))
    else
        cwebp -q 100 -m 6 -size 400 "$file" -o "../public/spells_low/$(basename "$file")"
        new_size=$(wc -c <"../public/spells_low/$(basename "$file")")
        total_new_size=$(($total_new_size + $new_size))
        echo "File: $(basename "$file")"
        echo "Original size: $original_size bytes"
        echo "New size: $new_size bytes"
        echo "Difference: $(($original_size-$new_size)) bytes"
        echo ""
    fi
done

echo "Total original size: $total_original_size bytes"
echo "Total new size: $total_new_size bytes"
echo "Total difference: $(($total_original_size-$total_new_size)) bytes"
