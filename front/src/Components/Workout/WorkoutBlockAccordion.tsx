import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import {
  LayoutList,
  CirclePause,
  EllipsisVertical,
  Plus,
  Trash,
  Repeat2,
  Goal,
} from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import convertirLink from "../../services/ConvertLink";
import { WorkoutElementDetail } from "../../types/Workout/WorkoutElementDetail";


type WorkoutBlockAccordionProps = {
  block: WorkoutElementDetail;
  index: number;
  draggableId: string;
  onClickAddExercise?: (blockId: number) => void;
  onClickDeleteBlock?: (idElement: number) => void;
  onClickDeleteExercise?: (exerciseId: number) => void;
  // Para DnD
  DraggableComponent: typeof Draggable; 
  DroppableComponent: typeof Droppable;
};


export default function WorkoutBlockAccordion({
  block,
  index,
  draggableId,
  onClickAddExercise,
  onClickDeleteBlock,
  onClickDeleteExercise,
  DraggableComponent,
  DroppableComponent,
}: WorkoutBlockAccordionProps) {
  return (
    <DraggableComponent draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2"
        >
          {/*@ts-ignore*/}
          <Accordion
            className={`${block.tipo === "Bloque" ? "bg-blue-50" : "bg-green-50"} rounded-lg px-2`}
            open={block.tipo === "Bloque"}
          >
          {/*@ts-ignore*/}
            <AccordionHeader
              {...provided.dragHandleProps}
              className={`relative gap-x-2 py-0 px-0 h-12 max-h-12 justify-start border-b-0 ${block.tipo === "Bloque" ? "text-blue-500" : "text-green-500"
                }`}
            >
              {block.tipo === "Bloque" ? (
                <div className="rounded-sm p-1 bg-blue-gray-400 bg-opacity-20">
                  <LayoutList />
                </div>
              ) : (
                <div className="rounded-sm p-1 bg-green-300 bg-opacity-20">
                  <CirclePause />
                </div>
              )}
              <div className="w-8/12 justify-start overflow-hidden whitespace-nowrap">
                {block.tipo === "Bloque" ? (
                  //@ts-ignore
                  <Typography className="font-black" variant="paragraph">
                    {block.data.nombre}
                  </Typography>
                ) : (
                //@ts-ignore
                  <Typography className="font-black" variant="paragraph">
                    Descanso de {block.data.duracionSegundos} segundos
                  </Typography>
                )}
                {block.tipo === "Bloque" && (
                  //@ts-ignore
                  <Typography color="gray" className="text-xs">
                    {block.data.descripcion}
                  </Typography>
                )}
              </div>
              <div className="absolute right-0 p-0">
                <Menu placement="left-end">
                  <MenuHandler>
                    <EllipsisVertical />
                  </MenuHandler>
                  {/*@ts-ignore*/}
                  <MenuList className="!min-w-fit p-1 px-4 justify-center items-center text-md">
                    {block.tipo === "Bloque" && (
                      //@ts-ignore
                      <MenuItem
                        onClick={() => onClickAddExercise && onClickAddExercise(block.data.id)}
                        className="flex items-center justify-center p-0 text-green-500"
                      >
                        <Plus />
                        ejercicio
                      </MenuItem>
                    )}
                    {block.tipo === "Bloque" && <hr className="my-1" />}
                    {/*@ts-ignore*/}
                    <MenuItem
                      onClick={() => onClickDeleteBlock && onClickDeleteBlock(block.IDelement)}
                      className="flex items-center justify-center p-0 text-red-500"
                    >
                      <Trash />
                      eliminar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </AccordionHeader>
            <AccordionBody className="relative p-0">
              {block.tipo === "Bloque" && (
                <DroppableComponent droppableId={`block-${block.IDelement}`} type="EXERCISE">
                  {(dropProvided) => (
                    //@ts-ignore
                    <List
                      ref={dropProvided.innerRef}
                      {...dropProvided.droppableProps}
                      className={`px-0 pt-0 ${block.data.WorkoutExercises.length === 0 ? "min-h-14 bg-blue-100 border-2 border-dashed border-blue-200" : ""}`}
                    >
                      {block.data.WorkoutExercises.map((we, idx) => (
                        <DraggableComponent
                          key={we.id.toString()}
                          draggableId={`exercise-${we.id}`}
                          index={idx}
                        >
                          {(exerciseProvided, exerciseSnapshot) => (
                            //@ts-ignore
                            <ListItem
                              ref={exerciseProvided.innerRef}
                              {...exerciseProvided.draggableProps}
                              {...exerciseProvided.dragHandleProps}
                              className="pl-2 pr-0 py-1 gap-3 bg-blue-gray-400 bg-opacity-10"
                              style={{
                                ...exerciseProvided.draggableProps.style,
                                background: exerciseSnapshot.isDragging ? "#c7e3ff" : "",
                              }}
                            >
                              <img
                                className="w-10 h-9 object-cover rounded-sm bg-white"
                                src={convertirLink(we.Ejercicio.Link) || ""}
                                alt={we.Ejercicio.Nombre}
                              />
                              <div className="w-8/12 overflow-hidden whitespace-nowrap">
                                {/*@ts-ignore*/}
                                <Typography variant="small">{we.Ejercicio.Nombre}</Typography>
                                <div className="flex justify-start items-center gap-5">
                                  <div className="flex items-center w-[39.59px]">
                                    <Repeat2 size={16} />
                                    <span className="text-sm">{we.series}</span>
                                  </div>
                                  <div className="flex items-center w-[39.59px]">
                                    <Goal size={16} />
                                    <span className="text-sm">{we.objetivo}</span>
                                  </div>
                                  <div className="flex items-center w-[46.81px]">
                                    <CirclePause size={16} />
                                    <span className="text-sm">{we.tiempoDescanso}s</span>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute right-0 pr-2">
                                <Trash
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onClickDeleteExercise && onClickDeleteExercise(we.id);
                                  }}
                                />
                              </div>
                            </ListItem>
                          )}
                        </DraggableComponent>
                      ))}
                      {dropProvided.placeholder}
                    </List>
                  )}
                </DroppableComponent>
              )}
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </DraggableComponent>
  );
}