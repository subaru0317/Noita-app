import React, { useState, useCallback, memo, useRef } from "react";
import DraggableSpell from "./DraggableSpell";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";
import SpellList from "./SpellList";
import "./App.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Button } from "@chakra-ui/react";

const DragDrop = memo(({setAdditionalInfo}) => {
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
    setBoard((prevboard) => {
      if (prevboard.length < 26) {
        const cloneSpell = {...item, id: uuidv4()};
        return [...prevboard, cloneSpell];
      } else {
        console.log("You can only have 26 spells on the board");
        return prevboard;
      }
    })
    setAdditionalInfo(prevboard => [...prevboard, {...item, id:uuidv4()}]);
  }, [setAdditionalInfo]);

  const handleSort = useCallback((dragIndex, hoverIndex) => {
    console.log("handleSort");
    setBoard((prevBoard) => {
      const draggedItem = prevBoard[dragIndex];
      return update(prevBoard, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedItem]
        ],
      });
    });
  }, []);
  

  const handleAddToBoard = useCallback((item) => {
    addImageToBoard(item);
  }, [addImageToBoard]);

  const handleReset = () => {
    setBoard([]);
  }

  return (
    <>
      <div className="DraggableSpellList">
        {SpellList.map((spell) => {
          return <DraggableSpell spell={spell} key={spell.id} onAddToBoard={handleAddToBoard} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        <TransitionGroup className="board-transition-group">
          {boardItems.map((spell, index) => {
            console.log(boardItems);
            return (
              <CSSTransition
                key={spell.id}
                timeout={500}
                classNames="item"
              >
                <DraggableSpell spell={spell} key={spell.id} onSortEnd={handleSort} index={index}/>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>
      <Button onClick={handleReset}>
        Wand Reset
      </Button>
    </>
  );
});

export default DragDrop;