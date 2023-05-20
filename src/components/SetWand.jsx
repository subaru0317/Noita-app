import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Image } from '@chakra-ui/react';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export default function SetWand() {
  const [isDropped, setIsDropped] = useState(false);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: 'draggable',
  });

  const draggableMarkup = (
    <Draggable {...listeners} {...attributes} nodeRef={setNodeRef}>
      <Image
        boxSize="100px"
        bg="#4f4f4f"
        _hover={{ bg: "gray.900" }}
        border="2px solid #931527"
        src="/spells/Spell_bomb.webp"
        alt='spell'
        style={{ borderRadius: '2px' }}
      />
    </Draggable>
  );
  
  const cloneMarkup = (
    <Draggable>
      <Image
        boxSize="100px"
        bg="#4f4f4f"
        _hover={{ bg: "gray.900" }}
        border="2px solid #931527"
        src="/spells/Spell_bomb.webp"
        alt='spell'
        style={{ borderRadius: '2px', opacity: 0.5 }}
      />
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? cloneMarkup : 'Drop here'}
      </Droppable>
    </DndContext>
  );
  
  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}