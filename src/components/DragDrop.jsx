// import React, { useState, useCallback, useMemo } from "react";
// import DraggableSpell from "./DraggableSpell";
// import { useDrop } from "react-dnd";
// import { v4 as uuidv4 } from "uuid";
// import update from "immutability-helper";
// import SpellList from "./SpellList";
// import "./App.css";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { Button } from "@chakra-ui/react";

// const DraggableSpellList = ({setSpellsState}) => {
//   console.log("DraggableSpellList")
  
//   const addImageToBoard = useCallback((item) => {
//     setSpellsState((prevSpellsState) => {
//       if (prevSpellsState.boardItems.length < 26) {
//         const cloneSpell = {...item, id: uuidv4()};
//         const newBoardItems = [...prevSpellsState.boardItems, cloneSpell];
//         const newWandSpellsInfo = [...prevSpellsState.wandSpellsInfo, {...item, id: uuidv4()}];

//         return {
//           boardItems: newBoardItems,
//           wandSpellsInfo: newWandSpellsInfo,
//         };
//       } else {
//         console.log("You can only have 26 spells on the board");
//         return prevSpellsState;
//       }
//     });
//   }, [setSpellsState]);

//   const handleAddToBoard = useCallback((item) => {
//     addImageToBoard(item);
//   }, [addImageToBoard]);

//   const draggableSpells = useMemo(() => {
//     return SpellList.map((spell) => (
//       <DraggableSpell spell={spell} key={spell.id} onAddToBoard={handleAddToBoard} />
//     ))
//   }, [SpellList, handleAddToBoard]);

//   return (
//     <div className="DraggableSpellList">
//       {draggableSpells}
//     </div>
//   )
// };

// const Board = ({ boardItems, drop }) => {
//   console.log("Board");
//   const handleSort = useCallback((dragIndex, hoverIndex) => {
//     setSpellsState((prevSpellsState) => 
//       update(prevSpellsState, {
//         boardItems: {
//           $splice: [
//             [dragIndex, 1],
//             [hoverIndex, 0, prevSpellsState.boardItems[dragIndex]],
//           ],
//         },
//       }),
//     );
//   }, []);

//   return (
//     <div className="Board" ref={drop}>
//       <TransitionGroup className="board-transition-group">
//         {boardItems.length > 0 && boardItems.map((spell, index) => (
//           <CSSTransition
//             key={spell.id}
//             timeout={500}
//             classNames="item"
//           >
//             <DraggableSpell spell={spell} key={spell.id} onSortEnd={handleSort} index={index}/>
//           </CSSTransition>
//         ))}
//       </TransitionGroup>
//     </div>
//   )
// };

// const ResetButton = ({setSpellsState}) => {
//   const handleReset = () => {
//     setSpellsState({ boardItems: [], wandSpellsInfo: [] });
//   }

//   return (
//     <Button onClick={handleReset}>
//       Wand Reset
//     </Button>
//   );
// };

// const DragDrop = ({setWandSpellsInfo}) => {
//   const [spellsState, setSpellsState] = useState({ boardItems: [], wandSpellsInfo: [] });
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "image",
//     drop: (item) => {
//       if (SpellList.some(spell => spell.id === item.id)) {
//         addImageToBoard(item);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   const { boardItems, wandSpellsInfo } = spellsState;
//   console.log("wandSpellsInfo", wandSpellsInfo);

//   return (
//     <>
//       <DraggableSpellList setSpellsState={setSpellsState} />
//       <Board boardItems={boardItems} drop={drop} />
//       <ResetButton setSpellsState={setSpellsState}/>
//     </>
//   );
// };

// export default DragDrop;


import React, { useState, useCallback, memo, useRef } from "react";
import DraggableSpell from "./DraggableSpell";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";
import SpellList from "./SpellList";
import "./App.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Button } from "@chakra-ui/react";

const DragDrop = memo(({setWandSpellsInfo}) => {
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
    setWandSpellsInfo(prevboard => [...prevboard, {...item, id:uuidv4()}]);
  }, [setWandSpellsInfo]);

  const handleSort = useCallback((dragIndex, hoverIndex) => {
    setBoard((prevBoard) => 
      update(prevBoard, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBoard[dragIndex]],
        ],
      }),
    );
  }, []);
  
  const handleAddToBoard = useCallback((item) => {
    addImageToBoard(item);
  }, [addImageToBoard]);

  const handleReset = () => {
    setBoard([]);
    setWandSpellsInfo([]);
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