import React, { useState, useCallback, memo } from "react";
import SpellAddButton from "./SpellAddButton";
import { v4 as uuidv4 } from "uuid";
import SpellList from "./SpellList";
import "./App.css";
import { Button } from "@chakra-ui/react";

const SpellSelector = ({setWandSpells}) => {
  console.log("SpellSelector");
  const addImageToBoard = useCallback((item) => {
    setWandSpells((prevboard) => {
      if (prevboard.length < 26) {
        const cloneSpell = {...item, id: uuidv4()};
        return [...prevboard, cloneSpell];
      } else {
        console.log("You can only have 26 spells on the board");
        return prevboard;
      }
    })
  }, []);

  const handleAddToBoard = useCallback((item) => {
    addImageToBoard(item);
  }, [addImageToBoard]);
  return (
    <div className="SpellAddButton">
      {SpellList.map((spell) => {
        return <SpellAddButton spell={spell} key={spell.id} onAddToBoard={handleAddToBoard} />;
      })}
    </div>
  );
}

const SortableSpellWand = ({wandSpells}) => {
  return (
    <div className="SortableSpellWand">
      {wandSpells.map((spell, index) => {
        return (
          <SpellAddButton spell={spell} key={spell.id} index={index}/>
        )
      })}
    </div>
  );
}

const ResetButton = memo(({setWandSpells}) => {
  const handleReset = useCallback(() => {
    setWandSpells([]);
  }, []);

  return (
    <Button onClick={handleReset}>
      Wand Reset
    </Button>
  );
});

const EditWand = memo(({wandSpells, setWandSpells}) => {
  console.log("wandSpells: ", wandSpells);
  return (
    <>
      <SpellSelector setWandSpells={setWandSpells} />
      <SortableSpellWand wandSpells={wandSpells} />
      <ResetButton setWandSpells={setWandSpells} />
    </>
  );
});

export default EditWand;