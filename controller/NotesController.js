import Notes from "../model/NotesModeljs.";

export const createNotes = async (req, res) => {
  const { title, content } = req.body;

  try {
    const notes = await Notes.create({
      title,
      content,
    });
    res.status(201).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  const { id } = req.params;
  try {
    const notes = await Notes.findAll({
      where: {
        id,
      },
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const notes = await Notes.update(
      {
        title,
        content,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  try {
    const notes = await Notes.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
