import { Input, IconButton, Chip } from "@material-tailwind/react";
import { Plus, X } from "lucide-react";

interface TagsInputProps {
  etiqueta: string;
  setEtiqueta: (value: string) => void;
  tags: string[];
  onAddTag: () => void;
  onDeleteTag: (index: number) => void;
  editable: boolean;
}

export function TagsInput({
  etiqueta,
  setEtiqueta,
  tags,
  onAddTag,
  onDeleteTag,
  editable,
}: TagsInputProps) {
  return (
    <>
      {editable && (
        <div className="relative flex w-full max-w-[24rem] mb-2">
          {/*@ts-ignore*/}
          <Input
            placeholder="ej. pecho, hipertrofia..."
            color="gray"
            value={etiqueta}
            className="pr-20"
            onChange={(e) => setEtiqueta(e.target.value)}
          />
          {/*@ts-ignore*/}
          <IconButton
            size="sm"
            color={etiqueta ? "amber" : "gray"}
            disabled={!etiqueta}
            className="!absolute right-1 top-1 rounded"
            onClick={onAddTag}
          >
            <Plus />
          </IconButton>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <Chip
            key={index}
            size="sm"
            value={tag}
            icon={
              editable && (
                //@ts-ignore
                <IconButton
                  id={String(index)}
                  onClick={() => onDeleteTag(index)}
                  color="white"
                  variant="text"
                  className="mb-[2px] w-3 h-3"
                >
                  <X size={15} strokeWidth="3px" />
                </IconButton>
              )
            }
          />
        ))}
      </div>
    </>
  );
}