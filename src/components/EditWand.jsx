import React, { useState, useCallback, memo } from "react";
import SpellAddButton from "./SpellAddButton";
import { v4 as uuidv4 } from "uuid";
import SpellList from "./SpellList";
import "./App.css";
import { Button } from "@chakra-ui/react";

// const SpellList = [	
// 	{ id: 0, name: "bomb", path: "/spells/Spell_bomb.webp" },
// ];

const SpellSelector = ({setWandSpells, setWandSpellsInfo}) => {
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
    setWandSpellsInfo(prevboard => [...prevboard, {...item, id:uuidv4()}]);
  }, [setWandSpellsInfo]);

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
    <div className="Board">
      {wandSpells.map((spell, index) => {
        return (
          <SpellAddButton spell={spell} key={spell.id} index={index}/>
        )
      })}
    </div>
  );
}

const ResetButton = memo(({setWandSpells, setWandSpellsInfo}) => {
  const handleReset = useCallback(() => {
    setWandSpells([]);
    setWandSpellsInfo([]);
  }, []);

  return (
    <Button onClick={handleReset}>
      Wand Reset
    </Button>
  );
});

const EditWand = memo(({setWandSpellsInfo}) => {
  const [wandSpells, setWandSpells] = useState([]);
  console.log("wandSpells: ", wandSpells);
  return (
    <>
      <SpellSelector setWandSpells={setWandSpells} setWandSpellsInfo={setWandSpellsInfo}/>
      <SortableSpellWand wandSpells={wandSpells} />
      <ResetButton setWandSpells={setWandSpells} setWandSpellsInfo={setWandSpellsInfo} />
    </>
  );
});

export default EditWand;