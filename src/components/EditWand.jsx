import { useState, useEffect, useCallback, memo } from "react";
import SpellAddButton from "./SpellAddButton";
import { v4 as uuidv4 } from "uuid";
import SpellList from "./SpellList";
import "./App.css";
import { Button, Image, Box, IconButton } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SpellSelector = ({ setWandSpells }) => {
  const addImageToBoard = useCallback((item) => {
    setWandSpells((prevboard) => {
      if (prevboard.length < 26) {
        const cloneSpell = { ...item, id: uuidv4() };
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

const SortableSpellWand = ({ wandSpells, setWandSpells }) => {
  const SortableSpell = ({ id, spell }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    

    let borderColor;
    switch (spell.type) {
      case 'projectile':
        borderColor = "#5A2323";
        break;
      case 'static_projectile':
        borderColor = "#8D3F18";
        break;
      case 'passive':
        borderColor = "#212F26";
        break;
      case 'utility':
        borderColor = "#7B2A74";
        break;
      case 'projectile_modifier':
        borderColor = "#2D3A72";
        break;
      case 'material':
        borderColor = "#356F44";
        break;
      case 'multicast':
        borderColor = "#1C6D73";
        break;
      case 'other':
        borderColor = "#714B33";
        break;
      default:
        borderColor = "#714B33";
    }

    return (
      <Box position="relative" display="inline-block">
        <Image
          ref={setNodeRef}
          boxSize="35px"
          bg="#595959"
          border={`2px solid ${borderColor}`}
          src={spell.path}
          alt={spell.name}
          style={{ borderRadius: '2px', ...style }}
          {...attributes}
          {...listeners}
        />
        <IconButton
          position="absolute"
          top="0"
          right="0"
          size="xs"
          height="10px"
          width="10px"
          aria-label="Remove"
          icon={<CloseIcon />}
          onClick={() => removeSpell(id)}
        />
      </Box>
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = wandSpells.findIndex(({ id }) => id === active.id);
      const newIndex = wandSpells.findIndex(({ id }) => id === over.id);
      setWandSpells(arrayMove(wandSpells, oldIndex, newIndex));
    }
  }, [wandSpells, setWandSpells]);

  const removeSpell = (id) => {
    setWandSpells(wandSpells.filter(spell => spell.id !== id));
  }

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!sticky && window.pageYOffset > 1500){  // 200px以上スクロールしたら
        setSticky(true);
      } else if (sticky && window.pageYOffset <= 1500){  // 200px以下に戻ったら
        setSticky(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [sticky]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={wandSpells.map(({ id }) => id)} strategy={rectSortingStrategy}>
        <div className={sticky ? "SortableSpellWand sticky" : "SortableSpellWand"}>
          {wandSpells.map((spell) => (
            <SortableSpell key={spell.id} id={spell.id} spell={spell} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

const ResetButton = memo(({ setWandSpells }) => {
  const handleReset = useCallback(() => {
    setWandSpells([]);
  }, []);

  return (
    <Button onClick={handleReset}>
      Wand Reset
    </Button>
  );
});

const EditWand = ({ wandSpells, setWandSpells }) => {
  return (
    <>
      <SpellSelector setWandSpells={setWandSpells} />
      <SortableSpellWand wandSpells={wandSpells} setWandSpells={setWandSpells} />
      <ResetButton setWandSpells={setWandSpells} />
    </>
  );
};

export default EditWand;
