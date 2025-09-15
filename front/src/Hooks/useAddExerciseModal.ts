import { useState, useEffect } from "react";
import axios from "axios";
import convertirLink from "../services/ConvertLink";
import { Exercise } from "../types/Exercises";
import { PropsModal } from "../types/PropsModal";

export const useAddExerciseModal = ({
  open,
  modo,
  ejercicioExistente,
  onClose,
}: Pick<PropsModal, "open" | "modo" | "ejercicioExistente" | "onClose">) => {
  const [link, setLink] = useState<string | null>(null);
  const [etiqueta, setEtiqueta] = useState("");
  const [convertedLink, setConvertedLink] = useState<string | null>(null);
  const [ejercicio, setEjercicio] = useState<Exercise>({
    ID_ejercicio: 0,
    Nombre: "",
    Descripcion: "",
    Link: "",
    Tag: [],
  });
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(() => {
    if (open) {
      if (modo === "Ver" && ejercicioExistente) {
        setEjercicio({
          ...ejercicio,
          ID_ejercicio: ejercicioExistente.ID_ejercicio,
          Nombre: ejercicioExistente.Nombre,
          Descripcion: ejercicioExistente.Descripcion,
          Link: ejercicioExistente.Link,
          Tag: ejercicioExistente.Tag.split(","),
        });
        setConvertedLink(ejercicioExistente.Link);
        setModoEditar(false);
      } else {
        setEjercicio({
          ID_ejercicio: 0,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        setConvertedLink(null);
        setLink(null);
        setModoEditar(false);
      }
    }
    // eslint-disable-next-line
  }, [open, modo, ejercicioExistente]);

  useEffect(() => {
    if (link) {
      const result = convertirLink(link);
      setConvertedLink(result);
      setEjercicio((prev) => ({
        ...prev,
        Link: result || "",
      }));
    } else {
      setConvertedLink(null);
    }
    // eslint-disable-next-line
  }, [link]);

  const handleCreate = async () => {
    try {
      const response = await axios.post("/ejercicio", {
        Nombre: ejercicio.Nombre,
        Descripcion: ejercicio.Descripcion,
        Link: ejercicio.Link,
        Tag: ejercicio.Tag.join(","),
      });

      if (response.data.success) {
        setEjercicio({
          ...ejercicio,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        onClose();
      }
      alert(`${response.data.message}`);
    } catch (error) {
      console.error("Error al crear el ejercicio:", error);
    }
  };

  const handleEditExercise = async () => {
    try {
      const response = await axios.put(`/ejercicio/${ejercicioExistente?.ID_ejercicio}`, {
        Nombre: ejercicio.Nombre,
        Descripcion: ejercicio.Descripcion,
        Link: ejercicio.Link,
        Tag: ejercicio.Tag.join(","),
      });
      if (response.data.success) {
        setEjercicio({
          ...ejercicio,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        onClose();
      }
      alert(`${response.data.message}`);
    } catch (error) {
      console.error("Error al editar el ejercicio:", error);
    }
  };

  const handleDeleteExercise = async () => {
    const sino = window.confirm("Seguro que deseas eliminar?");
    if (sino) {
      try {
        const response = await axios.delete(`/ejercicio/${ejercicioExistente?.ID_ejercicio}`);
        if (response.data.message) {
          window.alert(`${response.data.message}`);
          onClose();
        }
        if (response.data.error) {
          window.alert(`${response.data.error}`);
        }
      } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
      }
    }
  };

  const handleAddTag = () => {
    if (etiqueta.trim()) {
      setEjercicio((prev) => ({
        ...prev,
        Tag: [...prev.Tag, etiqueta],
      }));
      setEtiqueta("");
    }
  };

  const handleDeleteTag = (index: number) => {
    setEjercicio((prev) => ({
      ...prev,
      Tag: prev.Tag.filter((_, i) => i !== index),
    }));
  };

  return {
    ejercicio,
    setEjercicio,
    link,
    setLink,
    etiqueta,
    setEtiqueta,
    convertedLink,
    modoEditar,
    setModoEditar,
    handleCreate,
    handleEditExercise,
    handleDeleteExercise,
    handleAddTag,
    handleDeleteTag,
    onClose,
    modo,
    ejercicioExistente,
  };
};