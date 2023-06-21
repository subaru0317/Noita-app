#!/bin/bash
totalBefore=0
totalAfter=0

for file in $(find ./public -name '*.webp'); do
  sizeBefore=$(du -k "$file" | cut -f1)
  totalBefore=$((totalBefore + sizeBefore))
  
  cwebp -quiet -q 80 "$file" -o "$file.tmp" && mv "$file.tmp" "$file"
  
  sizeAfter=$(du -k "$file" | cut -f1)
  totalAfter=$((totalAfter + sizeAfter))
done

totalReduced=$((totalBefore - totalAfter))
echo "Total size Before: $totalBefore KB"
echo "Total size After: $totalAfter KB"
echo "Total size reduced: $totalReduced KB"
