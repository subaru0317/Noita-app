#!/bin/bash
# <SpellIconButton spellpath="/spells/Spell_bomb.webp" />
# =>
#  { id: 1, name: "bomb", path: "/spells/Spell_bomb.webp" },

printf 'const spellList = ['
i=0
while read -r line
do
  path=$(echo "$line" | grep -o '"[^"]*"')
  path="${path//\"/}"
  name=$(echo "$path" | sed 's,/spells/Spell_,,;s,\.webp$,,')
  printf '\t{ id: %d, name: "%s", path: "%s" },\n' "$i" "$name" "$path"
  i=$((i+1))
done
printf '];'
