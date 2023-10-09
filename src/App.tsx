import { useState, useEffect } from "react";
import "./App.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./components/SortableItems/SortableItems";
import tasksData from "./data/tasks";

function App() {
  const [items, setItems] = useState(tasksData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const $Items = items.map((i) => i.id);
      setItems((items) => {
        const oldIndex = $Items.indexOf(active.id);
        const newIndex = $Items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex).map((item, i) => ({
          ...item,
          order: i + 1,
        }));
      });
    }
  }

  useEffect(() => {
    console.log(
      "Sorted Item: ",
      [...items].sort((a, b) => a.id - b.id)
    );
  }, [items]);

  useEffect(() => {
    alert("Please Check Console Logs For Sorted Item Object 😊");
  }, []);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}

export default App;
