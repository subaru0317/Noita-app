import React, { useState, useCallback, useEffect } from "react";
import DraggableSpell from "./DraggableSpell";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";
// import SpellList from "./SpellList";
import "./App.css";


const SpellList = [
  {
    id: 1,
    name: "accelerating_shot",
    path: "/spells/Spell_accelerating_shot.webp"
  },
  {
    id: 2,
    name: "worm_rain",
    path: "/spells/Spell_worm_rain.webp"
  },
  {
    id: 3,
    name: "x_ray",
    path: "/spells/Spell_x_ray.webp"
  },
]

export default function DragDrop({setAdditionalInfo}) {
  const [boardItems, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    // item はドロップされたアイテムの情報
    // 詳しくはSpellのitem情報のものが来る
    drop: (item) => {
      // IDがSpellListのものと一致する場合
      // 新しくBoardに複製して追加
      if (SpellList.some(spell => spell.id === item.id)) {
        addImageToBoard(item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = useCallback((item) => {
      const cloneSpell = {...item, id: uuidv4()};
      setBoard((prevboard) => {
        return [...prevboard, cloneSpell];
      });
      setAdditionalInfo(prevboard => [...prevboard, cloneSpell]);
    }, [setAdditionalInfo]);

  const handleSort = useCallback((dragIndex, hoverIndex) => {
    setBoard((prevColumns) =>
      update(prevColumns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevColumns[dragIndex]]
        ]
      })
    );
  }, []);

  const handleAddToBoard = useCallback((item) => {
    addImageToBoard(item);
  }, [addImageToBoard]);
  console.log(boardItems);

  return (
    <>
      <div className="Pictures">
        {SpellList.map((spell) => {
          return <DraggableSpell spell={spell} key={uuidv4()} onAddToBoard={handleAddToBoard} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {boardItems.map((spell, index) => (
          <DraggableSpell spell={spell} key={uuidv4()} onSortEnd={handleSort} index={index}/>
        ))}
      </div>
    </>
  );
}